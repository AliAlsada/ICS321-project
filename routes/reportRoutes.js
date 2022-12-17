const express = require("express");
const reportQueries = require("../models/reports");
const searchQueries = require("../models/search");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("adminReports");
})


router.get("/report/1", async (req, res) => {

    const catagories = ["CHEMICAL", "REGULAR", "FRAGILE", "LIQUID"];
    const packages = await reportQueries.getAllPackages();

    for (let i = 0; i < packages.length; i++) {
        for (let j = 0; j < catagories.length; j++) {
            if (await searchQueries.getCatagory(packages[i].barcode, catagories[j])) {
                packages[i]["catagory"] = catagories[j]
            }
        }
    }

    res.render("adminPayments", { packages: packages });
})

router.get("/report/2", async (req, res) => {

    const packages = await reportQueries.getReportTwo();

    res.render("reportTwo", {delayed: packages.delayed, delivered: packages.delivered, lost: packages.lost});
})

router.post("/report/3", async (req, res) => {
    const dates = req.body
 

    const packages = await reportQueries.getReportThree(dates.deliveryDate[0], dates.deliveryDate[1]);
    console.log(packages.chemical)
    // console.log(packages)
    res.render("reportThree", {packages: packages});
})


router.get("/report/4", async (req, res) => {
  
    res.render("adminSearch");
})

router.post("/report/4", async (req, res) => {

    const searchInfo = req.body;

    const catagories = ["CHEMICAL", "REGULAR", "FRAGILE", "LIQUID"];
    const packages = await reportQueries.getReportFour(searchInfo);
    console.log(packages)

    for (let i = 0; i < packages.length; i++) {
        for (let j = 0; j < catagories.length; j++) {
            if (await searchQueries.getCatagory(packages[i].barcode, catagories[j])) {
                packages[i]["catagory"] = catagories[j]
            }
        }
    }

    res.render("adminResults", {packages: packages});
})

module.exports = router;