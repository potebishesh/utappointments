"use strict";
const express = require("express");
let router = express.Router();
const controller = require("../controllers/about")

// Render page.
router.get('/', controller.renderAboutPage);

module.exports = router;