const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex2.db',
        driver: sqlite3.Database
    })
}


const getCustomerAccountInfo = async (customerEmail) =>{
    const db = await getDbConnection();
    const accountInfo  = await db.get(`SELECT account_id, email, password FROM ACCOUNT WHERE email = '${customerEmail}' AND rule = 'user'`);
    await db.close();
    return accountInfo;
}


const getAdminAccountInfo = async (adminEmail) =>{
    const db = await getDbConnection();
    const accountInfo  = await db.get(`SELECT account_id, email, password FROM ACCOUNT WHERE email = '${adminEmail}' AND rule = 'admin'`);
    await db.close();
    return accountInfo;
}

const getCustomerInfo = async (customerEmail) =>{
    const db = await getDbConnection();
    const accountInfo  = await db.get(`SELECT customer_id, email FROM CUSTOMER WHERE email = '${customerEmail}'`);
    await db.close();
    return accountInfo;
}



const updateString = async (id, column, newName) => {
    const db = await getDbConnection();
    await db.run(`UPDATE CUSTOMER SET '${column}' = '${newName}' WHERE customer_id = ${id}`);
    await db.close();
}


module.exports = {getCustomerAccountInfo, getAdminAccountInfo, getCustomerInfo, updateString};