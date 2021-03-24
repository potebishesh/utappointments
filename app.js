// app.js is our back-end. It gets API calls from the front-end and does things.

// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const flash = require('express-flash');
const session = require("express-session");
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(
    passport, 
    username => users.find(user => user.username === username), //serialize user (save user instance)
    username => users.find(user => user.username === username)  //deserialize user
);

// Stores our userss
const users = [];

// Express setup
const app = express();
const { response, request } = require('express');

dotenv.config();                                        // Allows us to access our environment config when we need to.        
const dbService = require('./dbService');               // Imports dbservice class we exported so we can use it.

app.use(cors());                                        // When we have incoming API call, won't block and we can send to backend.       
app.use(express.json());                                // Send API call in json format.      
app.use(express.urlencoded({ extended : false }));      // Tell app we want to use data we send from front-end.

app.use(flash());                                       // Flash is for using pop-ups inside our webpage if there is an error or user is not registered/authenticated correctly
app.use(session({                                       // Stores and persists logged in user across webpages
    secret: process.env.SESSION_SECRET,                 
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());                         //
app.use(passport.session());                            //
app.use(methodOverride('_method'));                     // Override POST method on HTML file to run a different function (must be used for logout functionality)

app.use(express.static('public'));                      // Tell express our static files are in public/
app.engine('html', require('ejs').renderFile);          // Render HTML with ejs
app.set('views', __dirname + '/views');                 // Set view's folder to right path
app.set('view engine', 'html');                         // Set view engine to HTML instead of EJS



// Bishesh's Function
app.patch('/updateKey', (request, response) => {
    const {app_key} = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateKeyData(app_key);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
    
});

// Obtain appointment keys from the database.
app.get('/getKeys', (req, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();

    const result = db.getKeysData();

    result
    .then(data => response.json({data : data}))
    .catch(error => console.log(error));
});

// Obtain office hours availability from the database.
app.get('/getAvailability', (req, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();

    const result = db.getAvailabilityData();

    result
    .then(data => response.json({data : data}))
    .catch(error => console.log(error));
});



// create
app.post('/insert', (request, response) => {
    console.log(request.body);
});

app.post('/insertAvailability', (request, response) => {
    const {day, start_time, end_time} = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertAvailabilityData(day, start_time, end_time);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});


// read
app.get('/getAll', (req, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(error => console.log(error));
});

// update


// delete 



// Requiring files that contain our router objects
const register = require("./routes/register.js");
const about = require("./routes/about.js");
const login = require("./routes/login.js");
const appointment = require("./routes/appointment.js");
const contact = require("./routes/contact.js");
const index = require("./routes/index.js");
const instructor_main = require("./routes/instructor_main.js");
const logout = require("./routes/logout.js");
const update_key = require("./routes/update_key.js");
const office_hours = require("./routes/office_hours.js");

// Use the router objects to route these API calls.
// Use the .js file to handle endpoints that start with URL
app.use("/register", register);
app.use("/about", about);                   
app.use("/login", login);
app.use("/appointment", appointment);
app.use("/contact", contact);
app.use("/instructor_main", instructor_main);
app.use("/", index);
app.use("/logout", logout );
app.use("/update_key", update_key)
app.use("/office_hours", office_hours);



// Run the webserver on specified port in .env file.
app.listen(process.env.PORT, () => console.log(`app is running on port ${process.env.PORT}`));