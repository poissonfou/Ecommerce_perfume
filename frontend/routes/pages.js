const express = require("express");
const pagesControllers = require("../controllers/pages.js");

const router = express.Router();

router.get("/home", pagesControllers.getHome);

router.get("/login", pagesControllers.getLogin);

module.exports = router;
