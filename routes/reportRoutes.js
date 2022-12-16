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

router.get("/report/3", async (req, res) => {

    const packages = await reportQueries.getReportThree('2022-12-29','2022-12-31');
    console.log(packages)
    // res.render("reportTwo", {delayed: packages.delayed, delivered: packages.delivered, lost: packages.lost});
})

module.exports = router;