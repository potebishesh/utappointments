"use strict";
const express = require("express");
let router = express.Router();

router.get('/', (req, response) => {
    response.render('index.ejs');
});

module.exports = router;