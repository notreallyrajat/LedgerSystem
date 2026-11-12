const mongoose = require("mongoose")
const LedgerModel = require("./ledger.model")

const AccountSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },

    status : {
        type : String,
        enum : {
            values : ["Active","Frozen","Closed"],
            message : "Status Can be either active closed or frozen", 
        },
           default : "Active"
    },

    currency :{
        type : String,
        required : [true,"Currency is required for Creating an Account"],
        default : "INR"
        }
},{timestamps : true})


AccountSchema.index({user:1,status:1}) // Compound indexing for faster acess uses a BS tree a database topic


AccountSchema.methods.GetBalance = async function () {

        const BalanceData = await LedgerModel.aggregate([
    {
        $match: {
            Account: this._id
        }
    },
    {
        $group: {
            _id: null,

            TotalCredit: {
                $sum: {
                    $cond: [
                        { $eq: ["$type", "CREDIT"] },
                        "$Amount",
                        0
                    ]
                }
            },

            TotalDebit: {
                $sum: {
                    $cond: [
                        { $eq: ["$type", "DEBIT"] },
                        "$Amount",
                        0
                    ]
                }
            }
        }
    },
    {
        $project: { 
            _id: 0,
            balance: {
                $subtract: ["$TotalCredit", "$TotalDebit"]
            }
        }
    }
]);

    if(BalanceData.length === 0){
        return 0
    }

    return BalanceData[0].balance

}



const AccountModel = mongoose.model("AccountSchema",AccountSchema)

module.exports = AccountModel