const dbService = require("../dbService")

exports.renderInstructorPage = (request, response) => {
    response.render('instructor_main.ejs');
}

exports.renderHistoryPage = (request, response) => {
    response.render('history.ejs')
}

exports.renderSchedulePage = (request, response) => {
    response.render('schedule.ejs')
}

exports.renderOfficeHoursPage = (request, response) => {
    response.render('office_hours.ejs');
}

exports.renderUpdateKeyPage = (request, response) => {
    response.render('update_key.ejs');
}

exports.deleteAvailability = (request, response) => {
    const { day } = request.params;
    const db = dbService.getDbServiceInstance();
  
    const result = db.deleteOfficeHoursByDay(day);
  
    result
      .then((data) => response.json({ success: data }))
      .catch((err) => console.log(err));
}

exports.insertAvailability = (request, response) => {
    const { day, start_time, end_time } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertAvailabilityData(day, start_time, end_time);
  
    result
      .then((data) => response.json({ success: data }))
      .catch((err) => console.log(err));
}

exports.getAvailability = (req, response) => {
    const db = dbService.getDbServiceInstance();
  
    const result = db.getAvailabilityData();
  
    result
      .then((data) => response.json({ data: data }))
      .catch((error) => console.log(error));
}

exports.getAppointments = (req, response) => {
    const db = dbService.getDbServiceInstance();
  
    const result = db.getAppointmentData();
  
    result
      .then((data) => response.json({ data: data }))
      .catch((error) => console.log(error));
}

exports.getHistory = (req, response) => {
    const db = dbService.getDbServiceInstance();
  
    const result = db.getHistoryData();
  
    result
      .then((data) => response.json({ data: data }))
      .catch((error) => console.log(error));
}

exports.updateKey = (request, response) => {
    const { app_key } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateKeyData(app_key);
  
    result
      .then((data) => response.json({ success: data }))
      .catch((err) => console.log(err));
}

exports.deleteAppointment = (request, response) => {
    const { refnum } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowByRefNum(refnum);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
}