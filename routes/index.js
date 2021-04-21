"use strict";
const express = require("express");
let router = express.Router();
const controller = require("../controllers/index")

// Render page.
router.get('/', controller.renderIndexPage);

module.exports = router;