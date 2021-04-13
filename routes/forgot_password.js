"use strict";
const express = require("express");
let router = express.Router();

router.get("/", (req, response) => {
  response.render("forgot_password.html");
});

module.exports = router;
