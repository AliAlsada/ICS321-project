const express = require("express");
const registerController = require("../controllers/registerControllers");
// const bcrypt = require("bcryptjs");
// const db = require("../controllers/dbConnection")
const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());

//connect to the database

router.get("/", (req, res) => {
    res.render("signUp");
})

router.post("/auth", registerController.registerAuth)

module.exports = router;