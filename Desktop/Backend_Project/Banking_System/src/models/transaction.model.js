const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
    FromAccount : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "account",
        required : [true,"A from account is mandatory for a transaction to be created "]
    },

    ToAccount : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "account",
        required : [true,"A To account is mandatory for a transaction to be created "]
    },

    Status : {
        type : String,
        enum : {
            values : ["PENDING","COMPLETE","FAILED","REVERSED"],
            required : true
        },
        default : "PENDING"
    },

    Amount : {
        type : Number,
        min : [0,"Transaction Can not be negative"],
        required : true
    },

    IdempotencyKey : {
        type : String,
        required : true,
        idx : true,
        unique : true
    }
})



const TransactionModel = mongoose.model("TransactionModel",TransactionSchema)

module.exports = TransactionModel