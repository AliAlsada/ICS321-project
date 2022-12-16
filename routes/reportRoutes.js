const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("adminReports");
})


router.get("/report/1", (req, res) => {
    
    res.render("adminPayments");
})

module.exports = router;