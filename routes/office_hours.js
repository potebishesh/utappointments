"use strict";
const express = require("express");
let router = express.Router();

router.get('/', checkAuthenticated, (req, response) => { //checkAuthenticated for if user is not already logged in, cannot access instructor's main page
    response.render('office_hours.html');
});

function checkAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    response.redirect('/login');
}

module.exports = router;