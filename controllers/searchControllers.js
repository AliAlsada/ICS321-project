const db = require("./dbConnection");


const searchResults = (req, res) => {


    
    const {searchedBarcode, searchedCatagory, searchedCity, searchedState, searchedCondition} = req.body;
    const customerId = getCustomerID(req, res);
    console.log(customerId);
    
    if (searchedBarcode){
        sql = `SELECT barcode FROM PACKAGE WHERE barcode = ?`;
        db.get(sql, [searchedBarcode], (err, row) => {
            if (row !== undefined) {
                console.log(row);
                return res.render("search", {package: row});
            }
        })
    }

    else if (searchedCatagory){
        searchCatagory = (req, res, searchedCatagory)
    }
}




const getCustomerID = (req, res) => {

    sql = `SELECT customer_id FROM CUSTOMER WHERE (SELECT account_id FROM USER_ACCOUNT WHERE account_id = ?))`;
    db.get(sql, [req.session.user.id], (err, row) => {
        if (row !== undefined) {
            console.log(row);
            return row
        }
    })
}

const searchCatagory = (req, res, searchedCatagory) => {
    if (searchedCatagory = "Regular"){
        sql = `SELECT barcode FROM Regular WHERE barcode = ?`;
    }
}

module.exports = {
    searchResults,
}