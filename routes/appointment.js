"use strict";
const express = require("express");
let router = express.Router();

router.get('/', (req, response) => {
    response.render('make_appointment.ejs');
});

module.exports = router;