"use strict";
const express = require("express");
let router = express.Router();
const passport = require("passport");

router.get('/', checkNotAuthenticated, (req, response) => {           //checkNotAuthenticated for if user is already logged in, don't go back to login page
    response.render('instructor_login.ejs');
});

function checkNotAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return response.redirect('/instructor_main');
    }

    next();
}

module.exports = router;