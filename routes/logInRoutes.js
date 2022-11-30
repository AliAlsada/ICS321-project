
const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


router.get("/", (req, res) => {
    res.render("logIn");
})

router.post("/" , (req, res) => {
    console.log(req.body);
})

module.exports = router;