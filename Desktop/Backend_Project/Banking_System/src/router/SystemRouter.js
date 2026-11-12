const express = require("express")
const {SystemTranscationController} = require("../controller/transaction.controller")
const {SystemAuthentication}  = require("../middleware/auth.middleware")


const router = express.Router()


router.post("/SystemTransaction",SystemAuthentication,SystemTransactionController)


module.exports = router 