const express = require("express");
const bcrypt = require("bcryptjs");
const { trackResults } = require("../controllers/trackControllers");
const adminQueries = require("../models/admin");
const searchQueries = require("../models/search");
const historyQueries = require("../models/history");
const registerQueries = require("../models/register");
const sendQueries = require("../models/send");
const { session } = require("passport");

const router = express.Router();

router.use(express.urlencoded({ extended: 'false' }));
router.use(express.json());

router.get("/", (req, res) => {
    res.render("index");
})

router.get("/admin", async (req, res) => {
    res.render("adminIndex", { user: req.session.user, customers: await adminQueries.getAllCustomers()});
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
    
    res.render("adminResults", { packages: packages, id: req.params.id});
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

    let catagory;
    
    for (let j = 0; j < catagories.length; j++) {
        if (await searchQueries.getCatagory(package[0].barcode, catagories[j])) {
            catagory = catagories[j]
        }
    }

    const meta = await adminQueries.deletePackage(package[0], catagory);
    res.json(meta);

})

//delete packages
router.get("/updates/package/:id/delete", async (req, res) => {
    console.log("sss")
    res.redirect(`/index/${req.params.id}/packages`);

})

//history
router.get("/:barcode/track", async (req, res) => {
    const barcode = req.params.barcode;

    //get history
    const history = await searchQueries.trackResults(req.params.barcode);
    const locations = await searchQueries.getLocations();

    const states = ["DELIVERED", "IN_TRANSIT", "AVAILABLE", "LOST"];
    const package = await searchQueries.searchBarcode(barcode);

    let state;
    
    for (let j = 0; j < states.length; j++) {
        if (await searchQueries.getState(package[0].barcode, states[j])) {
            state = states[j]
        }
    } 

    res.render("adminTrack", {history: history,  locations: locations, state: state, barcode: barcode});

})

//history
router.post("/:barcode/track", async (req, res) => {
    const record = req.body;

    //add the record to the history
    const meta = await historyQueries.addRecord(record, req.params.barcode);
    const meta2 = await historyQueries.changeState(record, req.params.barcode);
    //change the package state

    console.log(meta);
})

//reports
//history
router.get("/reports", async (req, res) => {
    res.render("adminReports");
})


router.post("/addUser", async (req, res) => {
    //get the data from the user and hash the password
    const { email, firstName, lastName, phone, password, country, city} = req.body
    let hashedPassword = await bcrypt.hash(password, 8);

    //here, i need to validate the registered information (email, phone) from the database

    if (await registerQueries.validatePhone(phone))
        return res.render("adminIndex",  { user: req.session.user, customers: await adminQueries.getAllCustomers()});

    //validate email
    else if (await registerQueries.validateEmail(email))
        return res.render("adminIndex", { user: req.session.user, customers: await adminQueries.getAllCustomers()});

    //if email is not in used    
    else {
        //create customer
        const meta = await registerQueries.createCustomer(email, firstName, lastName, phone, country, city);
        const customer_id = meta.lastID;

        //create account for customer
        registerQueries.createCustomerAccount(email, hashedPassword, customer_id);
        res.render("adminIndex", { user: req.session.user, customers: await adminQueries.getAllCustomers()});
    }
})

router.post("/addPackage/:id", async (req, res) => {
    //get the data from the user and hash the password

    const senderID = req.params.id;
    console.log(senderID)
    await sendQueries.saveCustomer(req, res);
    await sendQueries.savePackage(req, res, senderID);
    return res.render("adminIndex",  { user: req.session.user, customers: await adminQueries.getAllCustomers()});
})


router.get("/log-out", async (req, res) => {
    req.session.destroy();
    res.redirect("/index");
    
})









module.exports = router;