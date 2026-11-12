const express = require("express")
const {RegisterUser,LoginUser,UserLogoutController}  = require("../controller/authcontroller")

const router = express.Router()

// The Post Endpoint is http://localhost:3000/auth/api/register
router.post("/register",RegisterUser)

router.post("/login",LoginUser)

// UserLgout Controller
router.post("/logout", UserLogoutController)



module.exports = router