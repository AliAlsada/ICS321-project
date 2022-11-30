
const express = require("express");
const bcrypt = require("bcryptjs");
const userLogInAuth = require("../controllers/logInControllers");

const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


router.get("/", (req, res) => {
    res.render("logIn");
})

router.post("/auth" , userLogInAuth.userLogInAuth)

module.exports = router;