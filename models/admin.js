const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
let alert = require('alert'); 


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

const getCustomer = async (customer_id) =>{
    const db = await getDbConnection();
    const customer  = await db.all(`SELECT * FROM CUSTOMER WHERE customer_id = ${customer_id}`);
    await db.close();
    return customer;
}

const getCustomerAccount = async (customer_id) =>{
    const db = await getDbConnection();
    const customerAccount = await db.get(`SELECT account_id FROM CUSTOMER WHERE customer_id = ${customer_id}`);
    await db.close();
    return customerAccount;
}

const updateCustomerInfo = async (customerArray) =>{

    //update customer
    const sql = `UPDATE CUSTOMER 
    SET email = "${customerArray[1]}", 
    Fname = "${customerArray[2]}", 
    Lname = "${customerArray[3]}", 
    phone = "${customerArray[4]}", 
    country = "${customerArray[5]}", 
    city = "${customerArray[6]}" WHERE  customer_id = ${customerArray[0]}`;


    //update account email if the customer has an account
    const customerAccount = await getCustomerAccount(customerArray[0]);

    if (customerAccount){
        try {
            await updateAccountInfo(customerArray[1], customerAccount.account_id);
        } catch (error) {
            alert("The email is used, please try another email");
            return;
        }
    }
    
        
    const db = await getDbConnection();

    try {
        await db.run(sql);
    } catch (error) {
        alert("error")
    }

    await db.close();
}

const updateAccountInfo = async (email, customerAccount) =>{
    const sql = `UPDATE ACCOUNT SET email = "${email}" WHERE account_id = ${customerAccount}`;

    const db = await getDbConnection();
    await db.run(sql);
    await db.close();
}


const updatePackageInfo = async (packageArray) =>{
    
}






module.exports = {
    getAllCustomers,
    updateCustomerInfo,
    getCustomer,
    updatePackageInfo,
}