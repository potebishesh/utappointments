const initializePassport = require("./passport-config");
const dbService = require("./dbService");
const passport = require("passport");

var users = []; // stores our instructors information

// initializeInstructor gets information about all the instructor from the
// database and stores it in user array;
exports.initializeInstructor = () => {
    users = [];
    
    const db = dbService.getDbServiceInstance();
    const result = db.getInstructorData();
  
    result
      .then((data) => {
        for (i = 0; i < data.length; i++) {
          users.push({
            fname: data[i].in_fname,
            lname: data[i].in_lname,
            email: data[i].in_fname,
            username: data[i].in_uname,
            password: data[i].in_pwd,
          });
        }
        console.log(users);
        initializePassport(passport, (username) =>
          users.find((user) => user.username === username)
        );
      })
      .catch((err) => console.log(err));
}

exports.users = users;