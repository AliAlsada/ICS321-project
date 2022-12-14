const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex2.db',
        driver: sqlite3.Database
    })
}

const getAllCustomers = async () =>{
    const db = await getDbConnection();
    const customers  = await db.all(`SELECT * FROM CUSTOMER`);
    await db.close();
    return customers;
}

module.exports = {
    getAllCustomers,
}