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


module.exports = {getCustomerAccountInfo, getAdminAccountInfo};