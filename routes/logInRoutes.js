
const express = require("express");
const logInControllers = require("../controllers/logInControllers");
const {userLogInAuth} = require("../middlewares/userAuth");
const {adminLogInAuth} = require("../middlewares/adminAuth");

const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


router.get("/", (req, res) => {
    res.render("logIn");
})

//cannot have two requests on the same url. I should auth both user and admin on the same controller
//using the same middleware
router.post("/auth", logInControllers.userLogInAuth);

// router.post("/auth" , adminLogInAuth, logInControllers.adminLogInAuth);


module.exports = router;