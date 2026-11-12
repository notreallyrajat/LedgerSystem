const env = require("dotenv").config()
const app = require("./src/app")
const Connect = require("./src/config/db")
const express  = require("express")




async function Connection(){
    try{
        await Connect()
        app.listen(3000,()=>{console.log(`The server is running `)})
        console.log("Connecting to the required Database")
    }

    catch(err){
        console.log("This is an error")
        process.exit(1)
    }
}


Connection()

