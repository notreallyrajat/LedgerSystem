const express = require("express")
const UserRouter = require("../src/router/user")
const CookieParser = require("cookie-parser")
const AccountRouter = require("../src/router/accountroutes")
const TransactionRouter = require("./router/transaction.routes")



const app = express()
app.use(express.json())
app.use(CookieParser())


// Register Routes
app.use("/api/auth",UserRouter)


// Account Routes
app.use("/api/account",AccountRouter)


// Transaction Routes
app.use("/api/Transaction",TransactionRouter)


module.exports = app