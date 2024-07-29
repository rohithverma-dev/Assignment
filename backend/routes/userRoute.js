const express = require("express");
const { Login , Register, forgotPassword, resetPassword } = require("../controllers/UserController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/register").post(Register) 
router.route("/login").post( isAuthenticated ,  Login) 
router.route("/password/forgot").post(forgotPassword);  
router.route("/password/reset/:token").put(resetPassword);  

module.exports = router;




