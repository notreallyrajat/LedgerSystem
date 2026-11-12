const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")


async function UserAuthentication(req,res,next){
    const authheader =  req.headers.authorization;
    const cookie = req.cookies?.JWT_TOKEN
    console.log("Here iam token 1")
    const token =  cookie || authheader?.split(" ")[1];
    console.log("Here iam token 2")
    console.log(token)
    if(!token) {
        console.log("No token found")
    }

    

    try{
        console.log("Iamg inside Try 1")
        const status = await jwt.verify(token,process.env.JWT_KEY)
        console.log(status)
        console.log(status.id)
        console.log("Iamg inside Try 2")
        const user = await UserModel.findOne({_id:status.id})  
        if(!user){
            console.log("Sorry user Not found");
            return res.status(401).json({message : "Sorry non user found"})
        }
        console.log("Iamg inside Try 3")
        console.log(user)
        req.user = user;
        next()
    }

    catch(err){
        console.log("Iam inside Catch 1")
        console.log("Sorry we got an error ")
        return res.status(401).json({
            message : "Authentication Failed"
        })
    }
}



async function SystemAuthentication(req, res, next) {

    const authheader = req.headers.authorization;
    const cookie = req.cookies?.JWT_TOKEN;

    const token = cookie || (
        authheader?.startsWith("Bearer ")
            ? authheader.split(" ")[1]
            : null
    );

    if (!token) {
        return res.status(401).json({
            message: "Authentication token missing"
        });
    }

    try {

        const status = jwt.verify(
            token,
            process.env.JWT_KEY
        );

        const user = await UserModel
            .findById(status.id)
            .select("+SystemUser");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (!user.SystemUser) {
            return res.status(403).json({
                message: "Not authorized as System User"
            });
        }

        req.user = user;

        next();

    } catch (err) {

        console.log("System Authentication Error:", err.message);

        return res.status(401).json({
            message: "Authentication Failed"
        });
    }
}



module.exports = {UserAuthentication,SystemAuthentication}