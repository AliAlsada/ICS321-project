const express = require("express");
const adminQueries = require("../models/admin");
const logInQueries = require("../models/logIn");


const router = express.Router();

router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


router.get("/:id", async (req, res) => {
    const customerID = req.params.id;

    res.render("profile", {userInfo: await adminQueries.getCustomer(req.params.id), user: customerID});
})

router.post("/:id", async (req, res) => {

    const data = req.body;
    const accountNumber = await adminQueries.getCustomerAccount(req.params.id);

     console.log(accountNumber)

    for (const key in data) {
        try {
            if (data[key]){      
                await logInQueries.updateString(req.params.id, key, data[key])
            }
            if (data["email"])
                await adminQueries.updateAccountInfo(data["email"], accountNumber.account_id)

        } catch (error) { 
            console.log(error)
        }
    }

})



module.exports = router;