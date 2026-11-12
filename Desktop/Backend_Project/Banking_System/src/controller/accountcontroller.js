const AccountModel = require("../models/accountmodel")

async function createaccount(req,res){
    console.log(req.user)
    const userId = req.user._id;
    const account = await AccountModel.create({user:userId})
    console.log(account)

    res.json({
        "Message" : "The Account has been created Check the Databases"
    })
}


// Get the Number of Accounts that Guy has
async function getUserAccountsController(req, res) {

    const accounts = await AccountModel.find({ user: req.user._id });

    res.status(200).json({
        accounts
    })
}



// Get the Account Balance of the Requested Account Id
async function  getAccountBalanceController(req, res) {
    const { accountId } = req.params;
    console.log(accountId)
    console.log(req.user._id)
    const account = await AccountModel.findOne({
        _id: accountId,
        user: req.user._id
    })



    console.log(`The Account Fetched is ${account}`)

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    const balance = await account.GetBalance();

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}




module.exports = {createaccount,getUserAccountsController,getAccountBalanceController}