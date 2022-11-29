const express = require("express");
const router = express.Router();


const bcrypt = require("bcryptjs");
router.use(express.urlencoded({extended: 'false'}));
router.use(express.json());


const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to the DB
const db = new  sqlite3.Database('./kfumex.db', sqlite3.OPEN_READWRITE, 
(err) => {
        if (err) return console.log(err.message);
        else console.log('connected to the SQLlite database');
});



router.post("/" , (req, res) => {

    //here, i need to validate the registered information (email, phone) from the database
    console.log(req.body);
    const {email, firstName, lastName, password, country, city, street, phone} = req.body
    let hashedPassword = bcrypt.hash(password, 8);
    // const IBAN = "sa291" 

    //validate the data



    //insert in the customer table
     
    sql = `INSERT INTO CUSTOMER(email, Fname, Lname, phone, country, city, street)  VALUES (?,?,?,?,?,?,?)`;
    db.run(sql,  [email, firstName, lastName, phone, country, city, street], (err) => {
        if (err) return console.log(err.message);
    });

    //insert in the account table and hash the password
        
    
     


    //after inserting the data in the database, redirect the user to the log in page.
    // res.redirect("/");

})

module.exports = router;