const express = require("express")

const {UserAuthentication}  = require("../middleware/auth.middleware")
const {createaccount,getUserAccountsController,getAccountBalanceController} = require("../controller/accountcontroller")


const router = express.Router()







// Create Account Route
router.post("/CreateAccount",UserAuthentication,createaccount)


// Get the Account Balance
router.get("/balance/:accountId",UserAuthentication,getAccountBalanceController)



// Fetch all the Accounts
router.get("/",UserAuthentication,getUserAccountsController)



module.exports = router