const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const async = require("async");
const crypto = require("crypto");
const dbService = require("../dbService");

exports.forgotPassword = (req, response, next) => {
  if (req.body.email.length == 0) {
    req.flash("error", "Please enter an email");
    response.redirect("/forgot_password");
  } else {
    async.waterfall(
      [
        function (done) {
          crypto.randomBytes(20, function (err, buf) {
            var token = buf.toString("hex");
            done(err, token);
          });
        },
        function (token, done) {
          var db = dbService.getDbServiceInstance();
          var user = db.getInstructorDataEmail(req.body.email);
          user
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
              //passwordTokenResult.catch((err) => console.log(err));

              var passwordExpirationResult = db.updatePasswordResetExpiration(
                req.body.email,
                new Date(Date.now() + 3600000)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ")
              );
              //passwordExpirationResult.catch((err) => console.log(err));
            })
            .catch((err) => done(err, token));
          done(null, token);
        },
        function (token, done) {
          console.log("made it here");
          var transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASS,
            },
          });
          var mailOptions = {
            to: req.body.email,
            from: "UTAppointment <no-reply@utappointment.com>",
            subject: "Your password reset link",
            text:
              "To reset your password, please click the following link:\n" +
              "http://" +
              req.headers.host +
              "/reset/" +
              token +
              "\n\n" +
              "If you did not request this password reset, ignore this email and your password will not be changed.\n",
          };
          transport.sendMail(mailOptions, function (err) {
            req.flash(
              "message",
              "An email has been sent to the requested email with further instructions."
            );
            done(err, "done");
          });
        },
      ],
      function (err) {
        if (err) return next(err);
        response.redirect("/forgot_password");
      }
    );
  }
};
