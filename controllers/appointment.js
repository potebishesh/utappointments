const dbService = require("../dbService");

exports.renderAppointmentPage = (req, response) => {
    response.render('make_appointment.ejs');
}

exports.insertAppointment = (request, response) => {
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
}

exports.getAvailability = (req, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();
    const result = db.getAvailabilityData();
    result
      .then((data) => response.json({ data: data }))
      .catch((error) => console.log(error));
}

exports.getKeys = (req, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();
    const result = db.getKeysData();
    result
      .then((data) => response.json({ data: data }))
      .catch((error) => console.log(error));
}