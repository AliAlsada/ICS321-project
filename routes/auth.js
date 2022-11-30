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
    //get the data from the user
    const {email, firstName, lastName, password, country, city, street, phone} = req.body
    let hashedPassword = bcrypt.hash(password, 8);

    //here, i need to validate the registered information (email, phone) from the database
    //validate the data

    sql = `SELECT phone FROM CUSTOMER WHERE phone = ?`;
    db.get(sql, [phone], (err, row) => {
        if (row !== undefined) {
            return res.render("signUp", {message: 'this phone is not unique'});
        }
    })

    sql = `SELECT email FROM CUSTOMER WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) {
            return console.error(err.message);
        } 
        else if (row == undefined){  
            //*****************insert in the customer table*****************
            sql = `INSERT INTO CUSTOMER(email, Fname, Lname, phone, country, city, street)  VALUES (?,?,?,?,?,?,?)`;

            db.run(sql,  [email, firstName, lastName, phone, country, city, street], (err) => {
                if (err) return console.log(err.message);
            });

            //*****************insert in the account table and hash the password*****************
            sql = `INSERT INTO ACCOUNT(email, password)  VALUES (?,?)`;
            db.run(sql,  [email, hashedPassword], (err) => {
                if (err) return console.log(err.message);
            });

            /**
             * join the two tables in order to get the auto incremented primary keys
             * then insert them into user_account table
            */

            sql = `SELECT a.account_id, c.customer_id FROM ACCOUNT a INNER JOIN CUSTOMER c ON a.email = c.email WHERE c.email = ?`;

            db.get(sql, [email], (err, row) => {
                if (err) return console.error(err.message);
                
                else{
                    sql = `INSERT INTO USER_ACCOUNT(account_id, customer_id)  VALUES (?,?)`;
                    db.run(sql,  [row.account_id, row.customer_id], (err) => {
                        if (err) return console.log(err.message);
                    });
                }});


            //*****************after inserting the data in the database, redirect the user to the log in page.*****************
            res.render("signUp", {message: 'User registered!'});
        }

        else {
            res.render("signUp", {message: 'test'});
        }
    });
    


})

module.exports = router;