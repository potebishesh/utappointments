"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const dbService = require("../dbService");
let router = express.Router();


const users = [];

router.get('/', checkNotAuthenticated, (req, response) => {  //checkNotAuthenticated for if user is already logged in, don't go back to register page
    response.render('instructor_register.ejs');
});

router.post("/", checkNotAuthenticated, async (req, response) => {
    //checkNotAuthenticated for if user is already logged in, don't run register POST
    try {
      //Try to hash password, if it fails then redirect back to register page
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const { fname, lname, email, username } = req.body;
  
      const db = dbService.getDbServiceInstance();
      const result = db.register(fname, lname, email, username, hashedPassword);
      //initializeInstructor();
      console.log("Successfully added instructor");
      response.redirect("/login");
    } catch {
      response.redirect("/register");
    }
    //console.log(users);
  });

function checkNotAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return response.redirect('/instructor_main');
    }

    next();
}

module.exports = router;