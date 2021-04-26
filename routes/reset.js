"use strict";
const { request } = require("express");
const express = require("express");
let router = express.Router();
const controller = require("../controllers/reset");

router.get("/", controller.redirectIndexPage);

router.get("/:token", controller.getToken);

router.post("/", controller.reset);

module.exports = router;
