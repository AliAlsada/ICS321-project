const express = require("express");
const sendControllers = require("../controllers/sendControllers");

const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


router.get("/", (req, res) => {
    res.render("send");
})

router.post("/save" , sendControllers.shipPackage)

module.exports = router;