// app.js is our back-end. It gets API calls from the front-end and does things.

// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

// Express setup
const app = express();

dotenv.config(); // Allows us to access our environment config when we need to.
const dbService = require("./dbService"); // Imports dbservice class we exported so we can use it.

app.use(cors()); // When we have incoming API call, won't block and we can send to backend.
app.use(express.json()); // Send API call in json format.
app.use(express.urlencoded({ extended: false })); // Tell app we want to use data we send from front-end.

app.use(flash()); // Flash is for using pop-ups inside our webpage if there is an error or user is not registered/authenticated correctly
app.use(
  session({
    // Stores and persists logged in user across webpages
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize()); //
app.use(passport.session()); //
app.use(methodOverride("_method")); // Override POST method on HTML file to run a different function (must be used for logout functionality)

app.use(express.static("public")); // Tell express our static files are in public/
app.engine("html", require("ejs").renderFile); // Render HTML with ejs
app.set("views", __dirname + "/views"); // Set view's folder to right path

const initializePassport = require("./passport-config");

const users = []; // stores our instructors information
initializeInstructor();

// initializeInstructor gets information about all the instructor from the
// database and stores it in user array;
function initializeInstructor() {
  const db = dbService.getDbServiceInstance();
  const result = db.getInstructorData();

  result
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        users.push({
          fname: data[i].in_fname,
          lname: data[i].in_lname,
          email: data[i].in_fname,
          username: data[i].in_uname,
          password: data[i].in_pwd,
        });
      }
      initializePassport(passport, (username) =>
        users.find((user) => user.username === username)
      );
    })
    .catch((err) => console.log(err));
}

// Bishesh's Function
app.patch("/updateKey", (request, response) => {
  const { app_key } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateKeyData(app_key);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});


// Obtain appointment keys from the database.
app.get("/getKeys", (req, response) => {
  // Grab DbService object.
  const db = dbService.getDbServiceInstance();

  const result = db.getKeysData();

  result
    .then((data) => response.json({ data: data }))
    .catch((error) => console.log(error));
});

// Obtain office hours availability from the database.
app.get("/getAvailability", (req, response) => {
  // Grab DbService object.
  const db = dbService.getDbServiceInstance();

  const result = db.getAvailabilityData();

  result
    .then((data) => response.json({ data: data }))
    .catch((error) => console.log(error));
});

// create
app.post("/insert", (request, response) => {
  console.log(request.body);
});

app.post("/insertAvailability", (request, response) => {
  const { day, start_time, end_time } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertAvailabilityData(day, start_time, end_time);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

app.post("/insertAppointment", (request, response) => {
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

app.post("/register", checkNotAuthenticated, async (req, response) => {
  //checkNotAuthenticated for if user is already logged in, don't run register POST
  try {
    //Try to hash password, if it fails then redirect back to register page
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { fname, lname, email, username } = req.body;

    const db = dbService.getDbServiceInstance();
    const result = db.register(fname, lname, email, username, hashedPassword);
    initializeInstructor();
    response.redirect("/login");
  } catch {
    response.redirect("/register");
  }
  console.log(users);
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    //checkNotAuthenticated for if user is already logged in, don't re-log in
    successRedirect: "/instructor_main",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// read
app.get("/getAll", (req, response) => {
  // Grab DbService object.
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((error) => console.log(error));
});

// update

// delete
app.delete("/deleteOfficeHours/:day", (request, response) => {
  const { day } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteOfficeHoursByDay(day);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

function checkNotAuthenticated(req, response, next) {
  if (req.isAuthenticated()) {
    return response.redirect("/instructor_main");
  }

  next();
}

// Requiring files that contain our router objects
const register = require("./routes/register.js");
const about = require("./routes/about.js");
const login = require("./routes/login.js");
const appointment = require("./routes/appointment.js");
const index = require("./routes/index.js");
const instructor_main = require("./routes/instructor_main.js");
const logout = require("./routes/logout.js");
const update_key = require("./routes/update_key.js");
const office_hours = require("./routes/office_hours.js");
const check_status = require("./routes/check_status.js");
const forgot_password = require("./routes/forgot_password.js");

// Use the router objects to route these API calls.
// Use the .js file to handle endpoints that start with URL
app.use("/register", register);
app.use("/about", about);
app.use("/login", login);
app.use("/appointment", appointment);
app.use("/instructor_main", instructor_main);
app.use("/", index);
app.use("/logout", logout);
app.use("/update_key", update_key);
app.use("/office_hours", office_hours);
app.use("/check_status", check_status);
app.use("/forgot_password", forgot_password);

// Run the webserver on specified port in .env file.
app.listen(process.env.PORT, () =>
  console.log(`app is running on port ${process.env.PORT}`)
);
