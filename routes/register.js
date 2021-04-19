"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
let router = express.Router();


const users = [];

router.get('/', checkNotAuthenticated, (req, response) => {  //checkNotAuthenticated for if user is already logged in, don't go back to register page
    response.render('instructor_register.ejs');
});


function checkNotAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return response.redirect('/instructor_main');
    }

    next();
}

module.exports = router;