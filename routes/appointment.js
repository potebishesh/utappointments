"use strict";
const express = require("express");
let router = express.Router();
const dbService = require("../dbService");

router.get('/', (req, response) => {
    response.render('make_appointment.ejs');
});

router.post("/insertAppointment", (request, response) => {
    const { st_fname, st_lname, st_email, app_date, app_time } = request.body;
    console.log(st_fname);
    console.log(st_lname);
    console.log(st_email);
    console.log(app_date);
    console.log(app_time);
  
    const db = dbService.getDbServiceInstance();
    const result = db.insertAppointment(
      st_fname,
      st_lname,
      st_email,
      app_date,
      app_time
    );
  
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

// Obtain appointment keys from the database.
router.get("/getKeys", (req, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();
  
    const result = db.getKeysData();
  
    result
      .then((data) => response.json({ data: data }))
      .catch((error) => console.log(error));
    });

  
module.exports = router;