const mongoose = require("mongoose");

const TransactionModel = require("../models/transaction.model");
const AccountModel = require("../models/accountmodel");
const LedgerModel = require("../models/ledger.model");
const EmailService = require("../services/email.service")

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function isValidAmount(amount) {
    return (
        typeof amount === "number" &&
        Number.isSafeInteger(amount) &&
        amount > 0
    );
}

function isValidObjectId(id) {
    return mongoose.isValidObjectId(id);
}

// --------------------------------------------------
// 1. NORMAL ACCOUNT-TO-ACCOUNT TRANSACTION
// --------------------------------------------------


async function TransactionController(req, res) {

    /**
     * 1. Validate request
     */
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "FromAccount, toAccount, amount and idempotencyKey are required"
        })
    }

    const fromUserAccount = await AccountModel.findOne({
        _id: fromAccount,
    })

    const toUserAccount = await AccountModel.findOne({
        _id: toAccount,
    })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    /**
     * 2. Validate idempotency key
     */

    const isTransactionAlreadyExists = await TransactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if (isTransactionAlreadyExists) {
        if (isTransactionAlreadyExists.status === "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })

        }

        if (isTransactionAlreadyExists.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing",
            })
        }

        if (isTransactionAlreadyExists.status === "FAILED") {
            return res.status(500).json({
                message: "Transaction processing failed, please retry"
            })
        }

        if (isTransactionAlreadyExists.status === "REVERSED") {
            return res.status(500).json({
                message: "Transaction was reversed, please retry"
            })
        }
    }

    /**
     * 3. Check account status
     */

    if (fromUserAccount.status !== "Active" || toUserAccount.status !== "Active") {
        return res.status(400).json({
            message: "Both fromAccount and toAccount must be ACTIVE to process transaction"
        })
    }

    /**
     * 4. Derive sender balance from ledger
     */
    const balance = await fromUserAccount.GetBalance()

    if (balance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`
        })
    }

    let transaction;
    try {


        /**
         * 5. Create transaction (PENDING)
         */
        const session = await mongoose.startSession()
        session.startTransaction()

        console.log("Session one")

        transaction = (await TransactionModel.create([ {
            FromAccount:fromAccount,
            ToAccount:toAccount,
            Amount:amount,
            IdempotencyKey:idempotencyKey,
            Status: "PENDING"
        } ], { session }))[ 0 ]


        console.log("Session two")


        const debitLedgerEntry = await LedgerModel.create([ {
            Account: fromAccount,
            Amount: amount,
            Transaction: transaction._id,
            type: "DEBIT"
        } ], { session })

                console.log("Session Three")


        // await (() => {
        //     return new Promise((resolve) => setTimeout(resolve, 15 * 1000));
        // })()

                        console.log("Session Four")


        const creditLedgerEntry = await LedgerModel.create([ {
            Account: toAccount,
            Amount: amount,
            Transaction: transaction._id,
            type: "CREDIT"
        } ], { session })


                                console.log("Session Five")

        await TransactionModel.findOneAndUpdate(
            { _id: transaction._id },
            { status: "COMPLETE" },
            { session }
        )

                                        console.log("Session Six")


        await session.commitTransaction()
        session.endSession()

                                                console.log("Session Seven")

    } catch (error) {

        return res.status(400).json({
            message: "Transaction is Pending due to some issue, please retry after sometime",
        })

    }
    /**
     * 10. Send email notification
     */
    await EmailService.SendEmail(req.user.email, req.user.name, "The Transaction of ${amount has been sucessfull}", toAccount)

    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: transaction
    })

}

// --------------------------------------------------
// 2. INITIAL FUNDS TRANSACTION
// --------------------------------------------------


async function CreateInitialFundsTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toAccount, amount and idempotencyKey are required"
        })
    }

    const toUserAccount = await AccountModel.findOne({
        _id: toAccount,
    })

    if (!toUserAccount) {
        return res.status(400).json({
            message: "Invalid toAccount"
        })
    }

    const fromUserAccount = await AccountModel.findOne({
        user: req.user._id
    })

    if (!fromUserAccount) {
        return res.status(400).json({
            message: "System user account not found"
        })
    }


    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = new TransactionModel({
        FromAccount: fromUserAccount._id,
        ToAccount :toAccount,
        Amount:amount,
        IdempotencyKey:idempotencyKey,
        status: "PENDING"
    })

    const debitLedgerEntry = await LedgerModel.create([ {
        Account: fromUserAccount._id,
        Amount: amount,
        Transaction: transaction._id,
        type: "DEBIT"
    } ], { session })

    const creditLedgerEntry = await LedgerModel.create([ {
        Account: toAccount,
        Amount: amount,
        Transaction: transaction._id,
        type: "CREDIT"
    } ], { session })

    transaction.status = "COMPLETED"
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
        message: "Initial funds transaction completed successfully",
        transaction: transaction
    })


}


// --------------------------------------------------
// EXPORTS
// --------------------------------------------------

module.exports = {
    TransactionController,
    CreateInitialFundsTransaction
};
