const usermodel = require("../models/user")
const jwt = require("jsonwebtoken")
const {SendEmail} = require("../services/email.service")
const onboarding = require("../services/onboarding")

async function RegisterUser(req,res) {
    const {email,name,password} = req.body

    const isExists = await usermodel.findOne({email:email})
    if(isExists){
        return res.status(422).json({
            message : "this email already exists",
            status : "Failed"
        })
    }
    
    const user = await usermodel.create({email:email,name:name,password:password })
    const token = jwt.sign({id : user._id},process.env.JWT_KEY)
    console.log(token)
    res.cookie("JWT_TOKEN",token)
    
    console.log(typeof onboarding);
    console.log(onboarding.slice(0, 100));

    await SendEmail(user.email,"Welcome Mail","Welcome Guys",onboarding)

    return res.status(201).json({user : {_id:user._id,name:user.name,password:user.password},"token" : token})

    
}

async function LoginUser(req,res){
    const {email,password} = req.body
    const user = await usermodel.findOne({email:email}).select("+password")

    if(!user){
        return res.status(422).json({"Message" : "The user Email or Password is incorrect"})
    }

    const Check = await user.ComparePassword(password)

    if(!Check){
        return res.status(422).json({"Message" :" The user Email or Password is incorrect"})
    }

    const token = jwt.sign({id : user._id},process.env.JWT_KEY)
    res.cookie("JWT_TOKEN",token)
    return res.status(201).json({user : {_id:user._id,name:user.name,password:user.password},"token" : token})   

}

async function UserLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }


    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}


module.exports = {RegisterUser,LoginUser,UserLogoutController};