const dbService = require("../dbService")

exports.renderInstructorPage = (request, response) => {
    response.render('instructor_main.ejs');
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

exports.updateKey = (request, response) => {
    const { app_key } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateKeyData(app_key);
  
    result
      .then((data) => response.json({ success: data }))
      .catch((err) => console.log(err));
}