"use strict";
const express = require("express");
let router = express.Router();
const controller = require("../controllers/check_status")

router.get('/', controller.renderCheckStatusPage);

module.exports = router;