"use strict";
const { request } = require("express");
const express = require("express");
let router = express.Router();
const controller = require("../controllers/forgot_password");

router.get("/", (req, response) => {
  response.render("forgot_password.ejs", { message : req.flash('message'), error : req.flash("error")});
});

router.post("/", controller.forgotPassword);

module.exports = router;
