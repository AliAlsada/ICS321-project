const express = require("express");
const trackControllers = require("../controllers/trackControllers");

const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


router.get("/", (req, res) => {
    res.render("track");
})


router.get("/:barcode", trackControllers.trackResults)

module.exports = router;