const dbService = require("../dbService");
const bcrypt = require("bcrypt");

exports.redirectIndexPage = (req, response) => {
    response.redirect("/");
}

exports.getToken = (req, response) => {
    let db = dbService.getDbServiceInstance();
    var user = db.getInstructorDataToken(req.params.token);
    user.then((data) => {
        if(data.length === 0) {
            req.flash("error", "Password reset token is invalid or has expired.");
            return response.redirect("/forgot_password");
        }
        if(data[0].resetPasswordExpires < Date.now()) {
            req.flash("error", "Password reset token is invalid or has expired.");
            return response.redirect("/forgot_password");
        }
        response.render("reset.ejs", {
            token: req.params.token,
            user: data,
            message: req.flash("message"),
            error: req.flash("error")
        });
    });

}

exports.reset = (req, response) => {
    console.log(req);
    if(req.body.password !== req.body.confirm_password) {
        req.flash("error", "Passwords do not match.");
        return response.redirect("back");
    }
    
    return response.redirect("back");

};
