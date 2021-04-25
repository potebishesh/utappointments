const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const async = require("async");
const crypto = require("crypto");
const dbService = require("../dbService");

exports.forgotPassword = (req, response) => {
  if (req.body.email.length == 0) {
    req.flash("error", "Please enter an email");
    response.redirect("/forgot_password");
  } else {
    async.waterfall([
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        var db = dbService.getDbServiceInstance();
        var result = db.getInstructorDataEmail(req.body.email);
        result
          .then((data) => {
            if (data.length === 0) {
              req.flash(
                "message",
                "If email is in our records, you will receive a password reset link soon."
              );
              return response.redirect("/forgot_password");
            }
            var passwordTokenResult = db.updatePasswordResetToken(
              token,
              req.body.email
            );
            passwordTokenResult.catch((err) => console.log(err));

            var passwordExpirationResult = db.updatePasswordResetExpiration(
              req.body.email
            );
            passwordExpirationResult.catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      },
    ]);
    //response.redirect("/forgot_password");
  }
};
