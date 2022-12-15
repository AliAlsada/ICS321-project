
const express = require("express");
const logInControllers = require("../controllers/logInControllers");


const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


router.get("/", (req, res) => {
    res.render("logIn");
})

router.post("/auth", logInControllers.logInAuth);

// router.post("/auth" , adminLogInAuth, logInControllers.adminLogInAuth);


module.exports = router;