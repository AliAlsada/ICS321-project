const express = require("express");
const searchControllers = require("../controllers/searchControllers");

const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());

router.get("/", (req, res) => {
    res.render("search", {user: req.session.user});
})

router.post("/result" , searchControllers.searchResults);

module.exports = router;