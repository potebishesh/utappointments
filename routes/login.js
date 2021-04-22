"use strict";
const express = require("express");
let router = express.Router();
const controller = require("../controllers/login");

// Page rendering.
router.get("/", checkNotAuthenticated, controller.renderLoginPage);

// Login page functions.
router.post("/", checkNotAuthenticated, controller.authenticateUser);

function checkNotAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return response.redirect("/instructor_main");
    }

    next();
}

module.exports = router;