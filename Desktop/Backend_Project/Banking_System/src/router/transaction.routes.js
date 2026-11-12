const express = require("express");
const {
    TransactionController,
    CreateInitialFundsTransaction
} = require("../controller/transaction.controller");

const {UserAuthentication,SystemAuthentication} = require("../middleware/auth.middleware");

const router = express.Router();

// Normal account-to-account transaction
router.post(
    "/CreateTransaction",
    UserAuthentication,
    TransactionController
);

// Initial funds transaction
router.post(
    "/InitialFund",
    SystemAuthentication,
    CreateInitialFundsTransaction
);

module.exports = router;
