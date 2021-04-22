const dbService = require("../dbService");

exports.renderCheckStatusPage = (request, response) => {
    response.render('check_status.ejs');
}

exports.getAppointmentStatus = (request, response) => {
    const { ref_num, st_email } = request.body;

    console.log( ref_num, st_email);
    const db = dbService.getDbServiceInstance();
    const result = db.getAppointmentStatus( ref_num, st_email );
    
    result
      .then((data) => response.json({ data: data }))
      .catch((err) => console.log(err));
}