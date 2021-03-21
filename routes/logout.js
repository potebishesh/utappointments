"use strict"
const express = require("express");
let router = express.Router();

router.delete('/logout', (req, response) => {   //app.delete ran by method override in HTML file. Logs user out and redirects to login page
    req.logOut();
    response.redirect('/login');
});