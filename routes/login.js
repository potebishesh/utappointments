"use strict";
const express = require("express");
let router = express.Router();
// const passport = require("passport");

router.get('/login', (req, response) => {
    response.render('instructor_login.html');
})

// router.get('/login', checkNotAuthenticated, (req, response) => {           //checkNotAuthenticated for if user is already logged in, don't go back to login page
//     response.render('instructor_login.html');
// });

// function checkNotAuthenticated(req, response, next) {
//     if(req.isAuthenticated()) {
//         return response.redirect('/instructor_main');
//     }

//     next();
// }

// router.post('/login', checkNotAuthenticated, passport.authenticate('local', {  //checkNotAuthenticated for if user is already logged in, don't re-log in
//     successRedirect: '/instructor_main',
//     failureRedirect: '/login',
//     failureFlash: true
// }));
module.exports = router;