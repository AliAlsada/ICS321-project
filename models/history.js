const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
let alert = require('alert');
const searchQueries = require("../models/search");



const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex2.db',
        driver: sqlite3.Database
    })
}


const addRecord = async (recordObject, barcode) => {
    console.log(recordObject)
    const db = await getDbConnection();

    const meta = await db.run(`INSERT INTO HISTORY 
    ('barcode', 'location_num', 'time', 'date') 
        VALUES 
    ('${barcode}', ${recordObject.locationNumber}, '${recordObject.Time}', '${recordObject.deliveryDate}')`);

    await db.close();
    return meta;
}


const changeState = async (recordObject, barcode) => {

    let state;
    const states = ["DELIVERED", "IN_TRANSIT", "AVAILABLE", "LOST"];
    for (let j = 0; j < states.length; j++) {
        if (await searchQueries.getState(barcode, states[j])) {
            state = states[j]
        }
    }


    const db = await getDbConnection();
    const meta = await db.run(`DELETE FROM '${state}' WHERE barcode = ${barcode} `)
    const meta1 = await db.run(`INSERT INTO '${recordObject.state}' VALUES (${barcode})`);

    await db.close();
    return meta1;
}




module.exports = {
    addRecord,
    changeState,
}