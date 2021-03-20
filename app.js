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
app.get('/getAll', (request, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(error => console.log(error));
});

app.get('/getKeys', (request, response) => {
    // Grab DbService object.
    const db = dbService.getDbServiceInstance();

    const result = db.getKeysData();

    result
    .then(data => response.json({data : data}))
    .catch(error => console.log(error));
});


// update


// delete 


// ROUTING
const users = [];
app.get('/about', (req, response) => {
    response.render('about');
});

app.get('/login', (req, response) => {
    response.render('instructor_login.html');
});
app.post('/login', async (req, response) => {

});

app.get('/appointment', (req, response) => {
    response.render('make_appointment.html');
});

app.get('/contact', (req, response) => {
    response.render('contact.html');
});

app.get('/', (request, response) => {
    response.render('index.html');
});

app.listen(process.env.PORT, () => console.log('app is running'));