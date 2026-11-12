const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true,"Email is Required"],
        unique : true,
        trim : true,
        lowercase : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"The Email entered is not valid"]
    },

    name : {
        type : String,
        required : [true,"Name is required"],
    },

    SystemUser : {
        required : true,
        select : false,
        immutable : true,
        default : false,
        type : Boolean
    },

    password : {
        type : String,
        required : [true,"Password is required"],
        select : false,
        minlenght : [6,"The password is not as per minimum length"]
    }
}, {timestamps : true})

UserSchema.pre("save",async function () {
    if(!this.isModified("password")){
        return 
    }

    const hashedpassword = await bcrypt.hash(this.password,10)
    this.password = hashedpassword
    return 

})

UserSchema.methods.ComparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model("UserModel",UserSchema)