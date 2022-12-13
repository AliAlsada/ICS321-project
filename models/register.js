const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'recipes_store.db3',
        driver: sqlite3.Database
    })
}

const validatePhone = async (phone) =>{
    const db = await getDbConnection();
    const phone  = await db.get(`SELECT phone FROM CUSTOMER WHERE phone = ${phone}`);
    await db.close();
    return phone;
}

const validateEmail = async (email) =>{
    const db = await getDbConnection();
    const email  = await db.get(`SELECT email FROM CUSTOMER WHERE phone = ${email}`);
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
    const sql = `INSERT INTO ACCOUNT ('email', 'password') values ('${email}', '${password}')`;
    const meta = await db.run(sql);

    //add account key to the customer 
    const sql2 = `INSERT INTO CUSTOMER ('account_id') values (${account_id}) WHERE customer_id = ${customer_id})`;
    await db.run(sql);

    await db.close();
}




module.exports = {}




