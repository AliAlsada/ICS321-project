const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const searchQueries = require("../models/search");
let alert = require('alert');


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex2.db',
        driver: sqlite3.Database
    })
}

const getAllPackages = async () => {
    const db = await getDbConnection();
    const packages = await db.all(`SELECT * FROM PACKAGE`);
    await db.close();
    return packages;
}

const getDelayedPackages = async () => {
    const db = await getDbConnection();

    // const sql = `SELECT barcode FROM PACKAGE WHERE CAST(strftime('%s', delivery_date) AS integer) > CAST(strftime('%s',  DATE('now'))  AS  integer)`;
    const sql2 = `SELECT * FROM PACKAGE WHERE CAST(strftime('%s', delivery_date) AS integer) < CAST(strftime('%s',  DATE('now'))  AS  integer)`;
    const packages = await db.all(sql2);
    await db.close();
    return packages;
}

const getDeliveredPackages = async () => {
    const db = await getDbConnection();
    const sql = `SELECT * FROM PACKAGE p INNER JOIN DELIVERED d on d.barcode = p.barcode`;
    const packages = await db.all(sql);
    await db.close();
    return packages;
}

const getLostPackages = async () => {
    const db = await getDbConnection();
    const packages = await db.all(`SELECT * FROM PACKAGE p INNER JOIN LOST d on d.barcode = p.barcode`);
    await db.close();
    return packages;
}


const getReportTwo = async () => {

    const delayed = await getDelayedPackages();
    const delivered = await getDeliveredPackages();
    const lost = await getLostPackages();
    
    const packages = {delayed, delivered, lost};
    return packages;
} 

const getRegularPackages = async (firstDate, secondDate) => {
    const db = await getDbConnection();

    // const sql = `SELECT barcode FROM PACKAGE WHERE CAST(strftime('%s', delivery_date) AS integer) > CAST(strftime('%s',  DATE('now'))  AS  integer)`;
    const sql = `SELECT * FROM PACKAGE p INNER JOIN REGULAR r on p.barcode = r.barcode WHERE CAST(strftime('%s', '${firstDate}') AS integer) < CAST(strftime('%s',  '${secondDate}')  AS  integer)`;
    const sql2 = `SELECT * FROM PACKAGE p INNER JOIN REGULAR r on p.barcode = r.barcode WHERE delivery_date BETWEEN '${firstDate}' AND '${secondDate}'`;
    const packages = await db.all(sql2);
    await db.close();
    return packages;
}

const getFragilePackages = async (firstDate, secondDate) => {
    const db = await getDbConnection();
    const sql = `SELECT * FROM PACKAGE p INNER JOIN FRAGILE r on p.barcode = r.barcode WHERE delivery_date BETWEEN '${firstDate}' AND '${secondDate}'`;
    const packages = await db.all(sql);
    await db.close();
    return packages;
}

const getLiquidPackages = async (firstDate, secondDate) => {
    const db = await getDbConnection();
    const sql = `SELECT * FROM PACKAGE p INNER JOIN LIQUID r on p.barcode = r.barcode WHERE delivery_date BETWEEN '${firstDate}' AND '${secondDate}'`;
    const packages = await db.all(sql);
    await db.close();
    return packages;
}

const getChemicalPackages = async (firstDate, secondDate) => {
    const db = await getDbConnection();
    const sql = `SELECT * FROM PACKAGE p INNER JOIN CHEMICAL r on p.barcode = r.barcode WHERE delivery_date BETWEEN '${firstDate}' AND '${secondDate}'`;
    const packages = await db.all(sql);
    await db.close();
    return packages;
}


const getReportThree = async (firstDate, secondDate) => {

    const regular = await getRegularPackages(firstDate, secondDate);
    const fragile = await getFragilePackages(firstDate, secondDate);
    const liquid = await getLiquidPackages(firstDate, secondDate);
    const chemical = await getChemicalPackages(firstDate, secondDate);
    
    const packages = {regular, fragile, liquid, chemical};
    return packages;
}

const getReportFour = async (searchInfo) => {
    const db = await getDbConnection();
    
    const sql = `SELECT DISTINCT p.barcode, p.delivery_date, p.distenation, p.sender_ID, p.weight, p.price 
    FROM PACKAGE p 
    INNER JOIN "${searchInfo.searchedCatagory}" a ON p.barcode = a.barcode 
    INNER JOIN "${searchInfo.searchedState}" s ON p.barcode = s.barcode
    WHERE distenation = "${searchInfo.searchedCity}"`;
    
    const packages = await db.all(sql);
    await db.close();
    return packages;
}


module.exports = {
    getAllPackages,
    getReportTwo,
    getReportThree,
    getReportFour,
}
