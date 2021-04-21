"use strict";
const express = require("express");
let router = express.Router();
const controller = require("../controllers/logout")

// Logout User
router.delete('/', controller.logoutUser);

module.exports = router;