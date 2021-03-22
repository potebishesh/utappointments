"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
let router = express.Router();


const initializePassport = require('../passport-config');
initializePassport(
    passport, 
    username => users.find(user => user.username === username), //serialize user (save user instance)
    username => users.find(user => user.username === username) //deserialize user
);

const users = [];

router.get('/', checkNotAuthenticated, (req, response) => {  //checkNotAuthenticated for if user is already logged in, don't go back to register page
    response.render('instructor_register.html');
});

router.post('/', checkNotAuthenticated, async (req, response) => {  //checkNotAuthenticated for if user is already logged in, don't run register POST
    try {                                                           //Try to hash password, if it fails then redirect back to register page
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        });
        response.redirect('/login');
    } catch {
        response.redirect('/instructor_register');
    }
    console.log(users);
});

function checkNotAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return response.redirect('/instructor_main');
    }

    next();
}

module.exports = router;