const db = require("./dbConnection");
db.get("PRAGMA foreign_keys = ON")


const searchResults = (req, res) => {

    const {searchedBarcode, searchedCatagory, searchedCity, searchedState, searchedCondition} = req.body;
    const customerID = getCustomerID(req, res);
    

    
    if (searchedBarcode){
        searchBarcode(searchedBarcode, req, res);
    }

    
    else if (searchedCatagory){
        searchCatagory(req, res, searchedCatagory, customerID);
    }

    // else if (searchedCity){
    //     searchCity(req, res, searchedCity, customerID);
    // }

    searchCity(req, res, searchedCity, customerID);
    
    
    // searchALL(req, res, customerID)


}




//this method will return the id of the customer who searched for a package 
const getCustomerID = (req, res) => {

    id;
    sql = `SELECT customer_id FROM USER_ACCOUNT WHERE account_id = ${req.session.user.id}`;
    db.get(sql, (err, row) => {id = row.customer_id})
    return id;
}



const searchALL = (req, res, customerID) => {


    sql = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p INNER JOIN CUSTOMER c ON p.sender_ID = c.customer_id WHERE p.receiver_ID = ${customerID} 
           UNION
        SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p INNER JOIN CUSTOMER c ON p.receiver_ID = c.customer_id WHERE p.sender_ID = ${customerID}`;

    db.all(sql, (err, rows) => {
        if (rows !== undefined) {
            return res.render("results", {user: req.session.user, packages:rows, id: customerID});
        }
    })

}

//if the customer wants to search by "only" the barcode
const searchBarcode = (searchedBarcode, req, res) => {
    sql = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, p.distenation FROM PACKAGE p INNER JOIN CUSTOMER c ON p.sender_ID = c.customer_id WHERE p.barcode = ${searchedBarcode}`;
    db.get(sql, (err, rows) => {
        if (rows !== undefined) {
            return res.render("results", {user: req.session.user, packages: [rows]});
        }
    })
}

//if the customer wants to search by "only" the catagory
const searchCatagory = (req, res, searchedCatagory, customerId) => {

    sql = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    WHERE p.receiver_ID = ${customerId} AND p.barcode = (SELECT barcode FROM ${searchedCatagory})
    
    UNION

    SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.receiver_ID = c.customer_id 
    WHERE p.sender_ID = ${customerId} AND p.barcode = (SELECT barcode FROM ${searchedCatagory})`

    // sql = `SELECT c.barcode,p.delivery_date, p.distenation FROM ${searchedCatagory} c INNER JOIN PACKAGE ON p.barcode = c.barcode WHERE p.receiverID = ${customerId} OR p.senderID = ${customerId}`;
    db.all(sql, (err, rows) => {
        if (rows !== undefined) {
            return res.render("results", {user: req.session.user, packages: rows, id: customerId});
        }
    })

}

//if the customer wants to search by "only" the city
const searchCity = (req, res, searchedCity, customerId) => {

    sql = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    WHERE p.distenation = ? AND p.receiver_ID = ${customerId}
     
    UNION

    SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.receiver_ID = c.customer_id 
    WHERE distenation = ? AND p.sender_ID = ${customerId}`;

    
    db.get(sql, [searchedCity], (err, rows) => {
        if (rows !== undefined) {
            console.log(rows)
            return res.render("results", {user: req.session.user, packages: rows, id: customerId});
        } else if (err) return console.log(err.message);
    })

}



module.exports = {
    searchResults,
}