const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex2.db',
        driver: sqlite3.Database
    })
}

const validatePhone = async (customerPhone) =>{
    const db = await getDbConnection();
    const phone  = await db.get(`SELECT phone FROM CUSTOMER WHERE phone = ${customerPhone}`);
    await db.close();
    return phone;
}

const validateEmail = async (customerEmail) =>{
    const db = await getDbConnection();
    const email  = await db.get(`SELECT email FROM CUSTOMER WHERE email = '${customerEmail}'`);
    await db.close();
    return email;
}

const createCustomer = async (email, firstName, lastName, phone, country, city, street) => {
    const db = await getDbConnection();

    const sql = `INSERT INTO CUSTOMER
    ('email', 'Fname', 'Lname', 'phone', 'country', 'city', 'street') 
        values 
    ('${email}', '${firstName}', '${lastName}', ${phone}, '${country}', '${city}', '${street}')`;

    const meta = await db.run(sql);
    await db.close();
    return meta;
}

const createCustomerAccount = async (email, password, customer_id) => {
    const db = await getDbConnection();

    //create account
    const sql = `INSERT INTO ACCOUNT ('email', 'password', 'rule') VALUES ('${email}', '${password}', 'user')`;
    const meta = await db.run(sql);
    const account_id = meta.lastID;

    //add account key to the customer 
    // const sql2 = `INSERT INTO CUSTOMER ('account_id') VALUES (${account_id}) WHERE customer_id = ${customer_id})`;
    const sql2 = `UPDATE CUSTOMER SET account_id = ${account_id} WHERE customer_id = ${customer_id}`;
    await db.run(sql2);

    await db.close();
}




module.exports = {validatePhone, validateEmail, createCustomer, createCustomerAccount};




