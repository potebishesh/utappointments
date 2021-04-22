"use strict";
const express = require("express");
let router = express.Router();
const controller = require("../controllers/check_status")

// Page rendering.
router.get('/', controller.renderCheckStatusPage);

// Check status page functions.
router.post('/getAppointmentStatus', controller.getAppointmentStatus);

module.exports = router;