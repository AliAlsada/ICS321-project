const express = require("express");
const adminQueries = require("../models/admin")
const searchQueries = require("../models/search")

const router = express.Router();

router.use(express.urlencoded({ extended: 'false' }));
router.use(express.json());

router.get("/", (req, res) => {
    res.render("index");
})


router.post("/updates", async (req, res) => {
    const meta = await adminQueries.updateCustomerInfo(req.body);
    res.json(meta);
})


router.get("/updates/:id", async (req, res) => {
    const customer_id = req.params.id;

    const customer = await adminQueries.getCustomer(customer_id);

    res.json(customer);
})

router.get("/:id/packages", async (req, res) => {


    const catagories = ["CHEMICAL", "REGULAR", "FRAGILE", "LIQUID"];
    const packages = await searchQueries.searchAll(req.params.id);

    for (let i = 0; i < packages.length; i++) {
        for (let j = 0; j < catagories.length; j++) {
            if (await searchQueries.getCatagory(packages[i].barcode, catagories[j])) {
                packages[i]["catagory"] = catagories[j]
            }
        }
    }

    res.render("adminResults", { packages: packages });
})


//update packages
router.post("/updates/package/:id", async (req, res) => {


    const catagories = ["CHEMICAL", "REGULAR", "FRAGILE", "LIQUID"]
    let preCatagory;

    for (let j = 0; j < catagories.length; j++) {
        if (await searchQueries.getCatagory(req.params.id, catagories[j])) {
            preCatagory = catagories[j];
        }
    }

   

    const meta = await adminQueries.updatePackageInfo(req.body, preCatagory);
    res.json(meta);
})

//update packages
router.get("/updates/package/:id", async (req, res) => {

    const catagories = ["CHEMICAL", "REGULAR", "FRAGILE", "LIQUID"];
    const package = await searchQueries.searchBarcode(req.params.id);



    for (let j = 0; j < catagories.length; j++) {
        if (await searchQueries.getCatagory(package.barcode, catagories[j])) {
            package["catagory"] = catagories[j]
        }
    }
    res.render("adminResults", { package: package });

})

//delete packages
router.post("/updates/package/:id/delete", async (req, res) => {

    const catagories = ["CHEMICAL", "REGULAR", "FRAGILE", "LIQUID"];
    const package = await searchQueries.searchBarcode(req.params.id);

    for (let j = 0; j < catagories.length; j++) {
        if (await searchQueries.getCatagory(package.barcode, catagories[j])) {
            package["catagory"] = catagories[j]
        }
    }

    

})






module.exports = router;