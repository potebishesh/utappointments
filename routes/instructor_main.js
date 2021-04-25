"use strict";
const express = require("express");
let router = express.Router();
const controller = require('../controllers/instructor_main');
const { route } = require("./register");

// Page rendering.
router.get('/', checkAuthenticated, controller.renderInstructorPage);
router.get("/history", checkAuthenticated, controller.renderHistoryPage);
router.get("/schedule", checkAuthenticated, controller.renderSchedulePage);
router.get('/office_hours', checkAuthenticated, controller.renderOfficeHoursPage);
router.get('/update_key', checkAuthenticated, controller.renderUpdateKeyPage);
router.get('/disable_date', checkAuthenticated, controller.renderDisableDatePage);

// Office hours page functions.
router.delete("/deleteOfficeHours/:day", controller.deleteAvailability);
router.post("/insertAvailability", controller.insertAvailability);
router.get("/getAvailability", controller.getAvailability);

// Schedule page functions.
router.get("/getAppointments", controller.getAppointments);
router.delete("/deleteAppointment/:refnum", controller.deleteAppointment);
// History page functions.
router.get("/getHistory", controller.getHistory);

// Disable date page functions.
router.post("/disableSelectedDate", controller.disableSelectedDate);
router.get("/getDisabledDates", controller.getDisabledDates);
router.delete("/deleteDisabledDate/:date", controller.deleteDisabledDate);

// Update key page functions.
router.patch("/updateKey", controller.updateKey);

// Authentication.
function checkAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    
    response.redirect('/login');
}

module.exports = router;