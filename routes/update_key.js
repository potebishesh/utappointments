"use strict";
const express = require("express");
let router = express.Router();

router.get('/', (req, response) => { //checkAuthenticated for if user is not already logged in, cannot access instructor's main page
    response.render('update_key.ejs');
});

function checkAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    response.redirect('/login');
}

module.exports = router;