"use strict";
const express = require("express");
let router = express.Router();
const dbService = require("../dbService");

router.get('/', checkAuthenticated, (req, response) => { //checkAuthenticated for if user is not already logged in, cannot access instructor's main page
    response.render('instructor_main.ejs');
});

router.get('/office_hours', checkAuthenticated, (req, response) => { //checkAuthenticated for if user is not already logged in, cannot access instructor's main page
    response.render('office_hours.ejs');
});

router.get('/update_key', (req, response) => { //checkAuthenticated for if user is not already logged in, cannot access instructor's main page
    response.render('update_key.ejs');
});

router.delete("/deleteOfficeHours/:day", (request, response) => {
    const { day } = request.params;
    const db = dbService.getDbServiceInstance();
  
    const result = db.deleteOfficeHoursByDay(day);
  
    result
      .then((data) => response.json({ success: data }))
      .catch((err) => console.log(err));
});

router.patch("/updateKey", (request, response) => {
    const { app_key } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateKeyData(app_key);
  
    result
      .then((data) => response.json({ success: data }))
      .catch((err) => console.log(err));
});

router.post("/insertAvailability", (request, response) => {
    const { day, start_time, end_time } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertAvailabilityData(day, start_time, end_time);
  
    result
      .then((data) => response.json({ success: data }))
      .catch((err) => console.log(err));
});

// Obtain office hours availability from the database.
router.get("/getAvailability", (req, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();
  
    const result = db.getAvailabilityData();
  
    result
      .then((data) => response.json({ data: data }))
      .catch((error) => console.log(error));
});

function checkAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    response.redirect('/login');
}

module.exports = router;