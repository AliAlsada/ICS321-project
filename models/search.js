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

    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID, weight, price
    FROM PACKAGE p INNER JOIN CUSTOMER c ON p.sender_ID = c.customer_id WHERE p.receiver_ID = ${customer_id}`;

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID, weight, price 
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

const searchCity = async (customer_id, searchedCity) =>{
    const db = await getDbConnection();

 
    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID 
    FROM PACKAGE p INNER JOIN CUSTOMER c ON p.sender_ID = c.customer_id WHERE p.distenation = "${searchedCity}" AND p.receiver_ID = ${customer_id}`;

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID 
    FROM PACKAGE p INNER JOIN CUSTOMER c ON p.receiver_ID = c.customer_id WHERE p.distenation = "${searchedCity}" AND p.sender_ID = ${customer_id}`;

    const sql = `${sendPackages} UNION ${receivedPackages}`

    const result = await db.all(sql);
    await db.close();
    return result;
}

const searchCatagory = async (customer_id, searchedCatagory) =>{
    const db = await getDbConnection();

    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    WHERE p.receiver_ID = ${customer_id} AND p.barcode = (SELECT barcode FROM "${searchedCatagory}")`

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    WHERE p.sender_ID = ${customer_id} AND p.barcode = (SELECT barcode FROM "${searchedCatagory}")`


    const sql = `${sendPackages} UNION ${receivedPackages}`

    const result = await db.all(sql);
    await db.close();
    return result;
}

const searchState = async (customer_id, searchedState) =>{
    const db = await getDbConnection();

    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    WHERE p.receiver_ID = ${customer_id} AND p.barcode = (SELECT barcode FROM "${searchedState}")`

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    WHERE p.sender_ID = ${customer_id} AND p.barcode = (SELECT barcode FROM "${searchedState}")`


    const sql = `${sendPackages} UNION ${receivedPackages}`

    const result = await db.all(sql);
    await db.close();
    return result;
}

const searchedCondition = async (customer_id, searchedCondition) =>{
    const db = await getDbConnection();

    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    WHERE p.receiver_ID = ${customer_id} AND p.barcode = (SELECT barcode FROM "${searchedCondition}")`

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    WHERE p.sender_ID = ${customer_id} AND p.barcode = (SELECT barcode FROM "${searchedCondition}")`


    const sql = `${sendPackages} UNION ${receivedPackages}`

    const result = await db.all(sql);
    await db.close();
    return result;
}


const getCatagory = async (barcode, catagory) =>{

    const db = await getDbConnection();
    const sql = `SELECT p.barcode FROM PACKAGE p INNER JOIN "${catagory}" c on p.barcode = c.barcode WHERE p.barcode = ${barcode}`;
    const result = await db.get(sql);
    await db.close();
    return result;
}   






module.exports = {
    searchAll,
    searchBarcode,
    searchCity,
    searchCatagory,
    searchState,
    searchedCondition,
    getCatagory
}