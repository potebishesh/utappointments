// app.js is our back-end. It gets API calls from the front-end and does things.

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { response } = require('express');

// allows us to access our environment config when we need to
dotenv.config();          

//
const dbService = require('./dbService');

// when we have incoming API call, won't block and we can send to backend
app.use(cors());       

// send API call in json format
app.use(express.json());       

// we won't be sending foreign data
app.use(express.urlencoded({ extended : false }));

// create
app.post('/insert', (request, response) => {
    console.log(request.body);
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

app.listen(process.env.PORT, () => console.log('app is running'));