"use strict";
const express = require("express");
let router = express.Router();

router.get('/', (req, response) => {
    response.render('instructor_login.html');
});
router.post('/', async (req, response) => {

});
module.exports = router;