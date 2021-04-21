"use strict";
const express = require("express");
let router = express.Router();
const controller = require("../controllers/register");

// Render pages.
router.get("/", checkNotAuthenticated, controller.renderRegisterPage);

// Register page functions.
router.post("/", checkNotAuthenticated, controller.registerUser);

function checkNotAuthenticated(req, response, next) {
    if(req.isAuthenticated()) {
        return response.redirect('/instructor_main');
    }

    next();
}

module.exports = router;