// const db = require("./dbConnection");
// db.get("PRAGMA foreign_keys = ON");
const sqlite3 = require("aa-sqlite");



// connection();



const savePackage = (req, res) => {
    const {country, city, fname, lname, 
        phone, email, weight, value, catagory, deliveryDate} = req.body;

    const senderID = getSenderID(req)
    
    // sql_customer = `INSERT INTO CUSTOMER(Fname, Lname, email, phone, country, city)  VALUES (?,?,?,?,?,?)`;
    // sql_package = `INSERT INTO PACKAGE(delivery_date, weight, distenation, receiver_ID, sender_ID, price) VALUES (?,?,?,?,?,?)`;
    // // sql_state = `INSERT INTO IN_TRANSIT(barcode)  VALUES (?)`;

    // db.run(sql_customer, [fname, lname, email, phone, country, city], function(err) {
    //     if (err) {
    //       return console.error(err.message);
    //     }
    //     console.log(`Rows inserted ${this.changes}`);
    //   });

    // const receiverID = getReceiverID(email);

    // db.run(sql_package, [deliveryDate, weight, city, receiverID, senderID, value], function(err) {
    //     if (err) {
    //       return console.error(err.message);
    //     }
    //     console.log(`Rows inserted ${this.changes}`);
    //   });
        
}


//this method will return the id of the customer who searched for a package 
const getSenderID = async (req) => {
    sql = `SELECT customer_id FROM CUSTOMER WHERE customer_id = ${req.session.user.id}`;
    const rows = await db.get(sql);
    await db.close();
    console.log(rows);  
}

// const getReceiverID = async (email) => {

//     sql = `SELECT customer_id FROM CUSTOMER WHERE email = ?`;
//     return db.get(sql, [email], (err, row) => {row.customer_id})
    
// } 



module.exports = {
    savePackage,
}