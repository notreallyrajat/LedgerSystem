const mongoose =  require("mongoose")

const LedgerSchema = new mongoose.Schema({
    Account : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "accountmodel",
        required : true,
        idx : true,
        immutable : true
    },

    Amount : {
        type : Number,
        immutable : true,
        required : true,
    },

    Transaction : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "transaction.model",
        required : true,
    },

    type : {
        type : String,
        enum : ["CREDIT","DEBIT"],
        required : true,
        immutable : true
    }
})

LedgerSchema.pre("save",function(){
    if(!this.isNew && this.isModified()){
        throw new Error("Operation terminated due to security reasons")
    }
})

function LedgerModification (){
        throw new Error("Operation terminated due to Security Reasons")
}

LedgerSchema.pre("updateOne",LedgerModification)
LedgerSchema.pre("findOneAndUpdate",LedgerModification)
LedgerSchema.pre("deleteOne",LedgerModification)
LedgerSchema.pre("findByIdAndUpdate",LedgerModification)
LedgerSchema.pre("updateMany",LedgerModification)
LedgerSchema.pre("deleteMany",LedgerModification)
LedgerSchema.pre("findOneAndDelete",LedgerModification)

const LedgerModel = mongoose.model("LedgerSchema",LedgerSchema)

module.exports = ("LedgerModel",LedgerModel)