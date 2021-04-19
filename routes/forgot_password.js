"use strict";
const express = require("express");
let router = express.Router();

router.get("/", (req, response) => {
  response.render("forgot_password.html");
});

router.post("/", (req, response) => {
  
  if(req.body.email.length == 0) {
    alert("Please enter an email!");
    response.redirect("/forgot_password");
  }

})

module.exports = router;
