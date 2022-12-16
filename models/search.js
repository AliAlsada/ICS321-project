const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')



const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex2.db',
        driver: sqlite3.Database
    })
}


const searchAll = async (customer_id) => {
    const db = await getDbConnection();

    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID, weight, price
    FROM PACKAGE p INNER JOIN CUSTOMER c ON p.sender_ID = c.customer_id WHERE p.receiver_ID = ${customer_id}`;

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID, weight, price 
    FROM PACKAGE p INNER JOIN CUSTOMER c ON p.receiver_ID = c.customer_id WHERE p.sender_ID = ${customer_id}`;

    const sql = `${sendPackages} UNION ${receivedPackages}`

    const result = await db.all(sql);
    await db.close();

    return result;
}

const searchBarcode = async (searchedBarcode) => {
    const db = await getDbConnection();

    sql = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, p.distenation, p.sender_ID, p.weight, p.price FROM PACKAGE p INNER JOIN CUSTOMER c ON p.sender_ID = c.customer_id WHERE p.barcode = ${searchedBarcode}`;
    const result = await db.all(sql);
    await db.close();
    return result;
}

const searchCity = async (customer_id, searchedCity) => {
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

const searchCatagory = async (customer_id, searchedCatagory) => {
    const db = await getDbConnection();


    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    INNER JOIN
    "${searchedCatagory}" s ON s.barcode = p.barcode WHERE p.receiver_ID = ${customer_id}`

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON  p.receiver_ID = c.customer_id 
    INNER JOIN
    "${searchedCatagory}" s ON s.barcode = p.barcode WHERE p.sender_ID = ${customer_id}`


    const sql = `${sendPackages} UNION ${receivedPackages}`

    const result = await db.all(sql);
    await db.close();
    return result;
}

const searchState = async (customer_id, searchedState) => {
    const db = await getDbConnection();

    const sendPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON p.sender_ID = c.customer_id 
    INNER JOIN
    "${searchedState}" s ON s.barcode = p.barcode WHERE p.receiver_ID = ${customer_id}`

    const receivedPackages = `SELECT p.barcode, c.Fname, c.Lname, p.delivery_date, distenation, p.sender_ID FROM PACKAGE p 
    INNER JOIN 
    CUSTOMER c ON  p.receiver_ID = c.customer_id 
    INNER JOIN
    "${searchedState}" s ON s.barcode = p.barcode WHERE p.sender_ID = ${customer_id}`


    const sql = `${sendPackages} UNION ${receivedPackages}`

    const result = await db.all(sql);
    await db.close();
    return result;
}

const searchedCondition = async (customer_id, searchedCondition) => {
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


const getCatagory = async (barcode, catagory) => {

    const db = await getDbConnection();
    const sql = `SELECT p.barcode FROM PACKAGE p INNER JOIN "${catagory}" c on p.barcode = c.barcode WHERE p.barcode = ${barcode}`;
    const result = await db.get(sql);
    await db.close();
    return result;
}


const trackResults = async (barcode) => {

    //connect to the database
    const db = await getDbConnection();

    //get history of the package from the database
    const row = await db.all(`SELECT * FROM HISTORY WHERE barcode = ${barcode} ORDER BY DATE`);

    //retreive the location name from location table by using the location num that is given in history table
    if (row.length > 0) {
        row.forEach(async record => {
            const location = await db.get(`SELECT country, city, name FROM LOCATION WHERE location_num = ${record.location_num}`);
            record["location_name"] = location; //add country and city name and name to the row that is taken from the history table
        })
    } return row;
}

const getState = async (barcode, state) => {
    
    //connect to the database
    const db = await getDbConnection();
    const sql = `SELECT p.barcode FROM PACKAGE p INNER JOIN "${state}" s on p.barcode = s.barcode WHERE p.barcode = ${barcode}`;
    const result = await db.get(sql);
    await db.close();
    return result;
}

const getLocations = async () => {
    
    //connect to the database
    const db = await getDbConnection();
    const sql = `SELECT location_num, name FROM LOCATION `;
    const locations = await db.all(sql);
    await db.close();
    return locations;
}






module.exports = {
    searchAll,
    searchBarcode,
    searchCity,
    searchCatagory,
    searchState,
    searchedCondition,
    getCatagory,
    trackResults,
    getState,
    getLocations
}