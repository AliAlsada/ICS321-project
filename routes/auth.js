const express = require("express");
const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


router.post("/" , (req, res) => {

    //here, i need to validate the registered information (email, phone) from the database
    console.log(req.body);
    res.redirect("/");
})

module.exports = router;