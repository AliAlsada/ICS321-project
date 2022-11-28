const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to the DB
const db = new  sqlite3.Database('./kfumex.db', sqlite3.OPEN_READWRITE, 
(err) => {
        if (err) return console.log(err.message);
        else console.log('connected to the SQLlite database');
});

//create Tables

sql = `CREATE TABLE IF NOT EXISTS CUSTOMER(
        customer_id CHAR(10) NOT NULL, 
        Fname VARCHAR(20), 
        Lname VARCHAR(20)      NOT NULL, 
        phone INT, 
        country VARCHAR(30), 
        city VARCHAR(30), 
        street VARCHAR(30), 
        IBAN VARCHAR(34) UNIQUE)`;



// CREATE TABLE CUSTOMER
// ( customer_id           CHAR(10) NOT NULL ,
//   Fname			VARCHAR(20),
//   Lname           VARCHAR(20)      NOT NULL,
//   phone VARCHAR(22),
//   street           VARCHAR(30),
//   city VARCHAR(30),
//   IBAN             VARCHAR(34) UNIQUE,
// PRIMARY KEY   (customer_id));
