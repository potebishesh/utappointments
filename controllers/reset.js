const dbService = require("../dbService");
const bcrypt = require("bcrypt");

exports.redirectIndexPage = (req, response) => {
  response.redirect("/");
};

exports.getToken = (req, response) => {
  let db = dbService.getDbServiceInstance();
  var user = db.getInstructorDataToken(req.params.token);
  user.then((data) => {
    if (data.length === 0) {
      req.flash("error", "Password reset token is invalid or has expired.");
      return response.redirect("/forgot_password");
    }
    if (data[0].resetPasswordExpires < Date.now()) {
      req.flash("error", "Password reset token is invalid or has expired.");
      return response.redirect("/forgot_password");
    }
    response.render("reset.ejs", {
      token: req.params.token,
      user: data,
      message: req.flash("message"),
      error: req.flash("error"),
    });
  });
};

exports.reset = (req, response) => {
  if (req.body.password !== req.body.confirm_password) {
    req.flash("error", "Passwords do not match.");
    return response.redirect("back");
  }
  let db = dbService.getDbServiceInstance();
  var user = db.getInstructorDataToken(req.params.token);
  user.then((data) => {
    if (data.length === 0) {
      req.flash("error", "Password reset token is invalid or has expired.");
      return response.redirect("/forgot_password");
    }
    if (data[0].resetPasswordExpires < Date.now()) {
      req.flash("error", "Password reset token is invalid or has expired.");
      return response.redirect("/forgot_password");
    }
    this.changePassword(req.body.password, data);
  });
  req.flash("message", "Password updated successfully");
  return response.redirect("/login");
};

exports.changePassword = async (password, data) => {
  try {
    //Try to hash password, if it fails then redirect back to register page
    const hashedPassword = await bcrypt.hash(password, 10);
    const email = data[0].in_email;
    const db = dbService.getDbServiceInstance();
    const result = db.updatePasswordByEmail(hashedPassword, email);
    result.catch((err) => console.log(err));
    const tokenUpdate = db.updatePasswordResetToken("", email);
    tokenUpdate.catch((err) => console.log(err));
    const expirationUpdate = db.updatePasswordResetExpiration(
      email,
      "0000-00-00 00:00:00"
    );
    expirationUpdate.catch((err) => console.log(err));
  } catch (e) {
    return console.log(e);
  }
};
