// app.js is our back-end. It gets API calls from the front-end and does things.

const express = require('express');
const bcrpyt = require('bcrypt');
const cors = require('cors');
const dotenv = require('dotenv');

// Express setup
const app = express();
const { response, request } = require('express');

dotenv.config();                            // Allows us to access our environment config when we need to.        
const dbService = require('./dbService');   // Imports dbservice class we exported so we can use it.

app.use(cors());                                        // When we have incoming API call, won't block and we can send to backend.       
app.use(express.json());                                // Send API call in json format.      
app.use(express.urlencoded({ extended : false }));      // Tell app we want to use data we send from front-end.

app.use(express.static('public'));                      // Tell express our static files are in public/
app.engine('html', require('ejs').renderFile);          // Render HTML with ejs
app.set('views', __dirname + '/views');                 // Set view's folder to right path
app.set('view engine', 'html');                         // Set view engine to HTML instead of EJS



// TODO Create seperate files for routing

// create
app.post('/insert', (request, response) => {
    console.log(request.body);
});

// Tyler's function
app.patch('/updateKey', (request, response) => {
    const {app_key} = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateKeyData(app_key);

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

app.get('/getKeys', (req, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();

    const result = db.getKeysData();

    result
    .then(data => response.json({data : data}))
    .catch(error => console.log(error));
});


// update


// delete 

const users = [];


// ROUTING
// Requiring files that contain our router objects
const about = require("./routes/about.js");
const login = require("./routes/login.js");
const appointment = require("./routes/appointment.js");
const contact = require("./routes/contact.js");
const index = require("./routes/index.js");

// Use the router objects to route these API calls.
// Use the .js file to handle endpoints that start with URL
app.use("/about", about);                   
app.use("/login", login);
app.use("/appointment", appointment);
app.use("/contact", contact);
app.use("/", index);

// Run the webserver on specified port in .env file.
app.listen(process.env.PORT, () => console.log('app is running'));