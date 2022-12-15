//register_auth
const bcrypt = require("bcryptjs");
const registerQueries = require("../models/register")


const registerAuth = async (req, res) => {
    //get the data from the user and hash the password
    const { email, firstName, lastName, password, country, city, street, phone } = req.body
    let hashedPassword = await bcrypt.hash(password, 8);

    //here, i need to validate the registered information (email, phone) from the database

    if (await registerQueries.validatePhone(phone))
        return res.render("signUp", { message: 'this phone is used, please try another number' });

    //validate email
    else if (await registerQueries.validateEmail(email))
        return res.render("signUp", { message: 'this email is used, please try another email' });

    //if email is not in used    
    else {
        //create customer
        const meta = await registerQueries.createCustomer(email, firstName, lastName, phone, country, city, street);
        const customer_id = meta.lastID;

        //create account for customer
        registerQueries.createCustomerAccount(email, hashedPassword, customer_id);
        res.render("logIn", { message: 'User registered!' });
    }


};



module.exports = {
    registerAuth
}