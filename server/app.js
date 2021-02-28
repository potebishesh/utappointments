const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { response } = require('express');

// allows us to access our environment config when we need to
dotenv.config();          

// when we have incoming API call, won't block and we can send to backend
app.use(cors());       

// send API call in json format
app.use(express.json());       

// we won't be sending foreign data
app.use(express.urlencoded({ extended : false }));

// create
app.post('/insert', (request, response) => {

});

// read
app.get('/getAll', (request, response) => {
    console.log('test');
});

// update


// delete route