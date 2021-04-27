const dbService = require("../dbService");
const nodemailer = require("nodemailer");

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

exports.getAppointmentInfo = (request, response) => {
  // Grab DbService object.
  const { st_fname, st_lname, st_email, app_date, app_time } = request.body;

  const db = dbService.getDbServiceInstance();

  const result = db.getAppointmentInfo(st_fname, st_lname, st_email, app_date, app_time);

  result
    .then((data) => response.json({ data: data }))
    .catch((error) => console.log(error));
}

exports.getBookedSpots = (req, response) => {
  // Grab DbService object.
  const db = dbService.getDbServiceInstance();
  const result = db.getBookedSpots();
  result
    .then((data) => response.json({ data: data }))
    .catch((error) => console.log(error));
}

exports.sendNotification = (req, response) => {
  var transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  var mailOptions = {
    to: req.body.email,
    from: "UTAppointment <no-reply@utappointment.com>",
    subject: "Office Hours Appointment",
    text:
      "Dear Student,\n\n" + 
      req.body.text + 
      "\n\nThanks,\nUTAppointment"
  };
  transport.sendMail(mailOptions, function (err) {
    req.flash(
      "message",
      "An email has been sent to the requested email with further instructions."
    );
    done(err, "done");
  });
}
