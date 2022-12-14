const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')



const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex2.db',
        driver: sqlite3.Database
    })
}


const searchAll = async (customer_id) =>{
    const db = await getDbConnection();

    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID 
    FROM PACKAGE p INNER JOIN CUSTOMER c ON p.sender_ID = c.customer_id WHERE p.receiver_ID = ${customer_id}`;

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID 
    FROM PACKAGE p INNER JOIN CUSTOMER c ON p.receiver_ID = c.customer_id WHERE p.sender_ID = ${customer_id}`;

    const sql = `${sendPackages} UNION ${receivedPackages}`

    const  result = await db.all(sql);
    await db.close();

    return result;
}

const searchBarcode = async (searchedBarcode) =>{
    const db = await getDbConnection();

    sql = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, p.distenation FROM PACKAGE p INNER JOIN CUSTOMER c ON p.sender_ID = c.customer_id WHERE p.barcode = ${searchedBarcode}`;
    const result = await db.all(sql);
    await db.close();
    return result;
}





module.exports = {
    searchAll,
    searchBarcode,
}