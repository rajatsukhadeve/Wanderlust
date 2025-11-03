const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirect } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


//log in
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirect,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.login)


router.get("/logout",userController.logout);

module.exports = router;