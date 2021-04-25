"use strict";
const { request } = require("express");
const express = require("express");
let router = express.Router();

router.get("/", (req, response) => {
  response.render("forgot_password.ejs", { message : req.flash('message')});
});

router.post("/", (req, response) => {
  
  if(req.body.email.length == 0) {
    req.flash("message", "Please enter an email");
    response.redirect("/forgot_password");
  }
  response.redirect("/forgot_password");

})

module.exports = router;
