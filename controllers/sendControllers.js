

const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex.db',
        driver: sqlite3.Database
    })
}


const shipPackage = async (req, res) => {
    const {country, city, fname, lname, 
        phone, email, weight, value, catagory, deliveryDate} = req.body;

    const senderID = await getSenderID(req)

    await saveCustomer(req, res)
    await savePackage(req, res, senderID)

}


const saveCustomer = async (req, res) =>{
    const {country, city, fname, lname, 
        phone, email, weight, value, catagory, deliveryDate} = req.body;

    const db = await getDbConnection();
    sql = `INSERT INTO CUSTOMER(Fname, Lname, email, phone, country, city)  VALUES ("${fname}","${lname}","${email}","${phone}","${country}","${city}")`;
    const meta = await db.run(sql)
    await db.close()
    return meta

}

const savePackage = async (req, res, senderID) =>{
    const {country, city, fname, lname, 
        phone, email, weight, value, catagory, deliveryDate} = req.body;
    
    const receiverID = await getReceiverID(email);

    const db = await getDbConnection();
    sql= `INSERT INTO PACKAGE(delivery_date, weight, distenation, receiver_ID, sender_ID, price) VALUES ("${deliveryDate}","${weight}","${city}","${receiverID}","${senderID}","${value}")`;
    const meta = await db.run(sql);
    
    sql= `INSERT INTO IN_TRANSIT(barcode) VALUES (${meta.lastID})`;
    await db.run(sql);

    await db.close()
    return meta

}


//this method will return the id of the customer who searched for a package 
const getSenderID = async (req) => {
    const db = await getDbConnection();
    const row = await db.get(`SELECT customer_id FROM USER_ACCOUNT WHERE account_id = ${req.session.user.id}`)
    db.close();
    console.log(row)
    return row["customer_id"];
}

const getReceiverID = async (email) => {
    const db = await getDbConnection();
    const row = await db.get(`SELECT customer_id FROM CUSTOMER WHERE email = "${email}"`);
    db.close();
    console.log(row)
    return row["customer_id"];
    
} 



module.exports = {
    shipPackage,
}