"use strict";
const express = require("express");
let router = express.Router();
const controller = require("../controllers/appointment")

// Render Page.
router.get("/", controller.renderAppointmentPage);

// Appointment page functions.
router.post("/insertAppointment", controller.insertAppointment);


// Obtain office hours availability from the database.
router.get("/getAvailability", controller.getAvailability);
router.get("/getKeys", controller.getKeys);


// Obtain appointment information from the database.
router.post("/getAppointmentInfo", controller.getAppointmentInfo); 

module.exports = router;