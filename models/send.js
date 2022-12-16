const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const { compareSync } = require('bcryptjs')


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex2.db',
        driver: sqlite3.Database
    })
}

const saveCustomer = async (req, res) =>{
    const {country, city, fname, lname, 
        phone, email, weight, value, catagory, deliveryDate} = req.body;

    const db = await getDbConnection();

    try {
        sql = `INSERT INTO CUSTOMER(Fname, Lname, email, phone, country, city)  VALUES ("${fname}","${lname}","${email}","${phone}","${country}","${city}")`;
        await db.run(sql)
        await db.close()
        
    } catch (error) {
        console.log("this customer has an account")
        await db.close()
    }


}

const savePackage = async (req, res, senderID) =>{
    const {country, city, fname, lname, 
        phone, email, weight, value, catagory, deliveryDate} = req.body;

    const payment = weight * 3;
    const receiverID = await getReceiverID(email);

    const db = await getDbConnection();
    sql= `INSERT INTO PACKAGE(delivery_date, weight, distenation, receiver_ID, sender_ID, price, payment) VALUES ("${deliveryDate}",${weight},"${city}",${receiverID}, ${senderID}, ${value}, ${payment})`;
    const meta = await db.run(sql);
    
    sql= `INSERT INTO IN_TRANSIT(barcode) VALUES (${meta.lastID})`;
    await db.run(sql);
    
    sql= `INSERT INTO "${catagory}"(barcode) VALUES (${meta.lastID})`;
    await db.run(sql);

    await db.close()
    return meta
}




const getReceiverID = async (email) => {
    const db = await getDbConnection();
    const row = await db.get(`SELECT customer_id FROM CUSTOMER WHERE email = "${email}"`);
    db.close();
    console.log(row)
    return row["customer_id"];
    
} 




module.exports = {saveCustomer, savePackage};




