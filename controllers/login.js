const passport = require("passport");

exports.renderLoginPage = (req, response) => {
    response.render('instructor_login.ejs');
}

exports.authenticateUser = passport.authenticate("local", {
    //checkNotAuthenticated for if user is already logged in, don't re-log in
    successRedirect: "/instructor_main",
    failureRedirect: "/login",
    failureFlash: true
});