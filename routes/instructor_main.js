"use strict";
const express = require("express");
let router = express.Router();

router.get('/instructor_main', (req, response) => {
    response.render('instructor_main.html');
});

module.exports = router;