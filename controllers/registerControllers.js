//register_auth
const bcrypt = require("bcryptjs");
const db = require("./dbConnection");
const registerQueries = require("../models/register")
db.get("PRAGMA foreign_keys = ON")



const registerAuth = async (req, res) => {
    //get the data from the user
    const { email, firstName, lastName, password, country, city, street, phone } = req.body
    let hashedPassword = await bcrypt.hash(password, 8);

    //here, i need to validate the registered information (email, phone) from the database
    //validate the data

    if (registerQueries.validatePhone)
        return res.render("signUp", { message: 'this phone is used, please try another number' });

    //validate email
    else if (registerQueries.validateEmail)
        return res.render("signUp", { message: 'this email is used, please try another email' });

    //if email is not in used    
    else {
        //create customer
        const meta = registerQueries.createCustomer(email, firstName, lastName, phone, country, city, street);

        //create account for customer
        registerQueries.createCustomerAccount(email, hashedPassword, meta);
        res.render("logIn", { message: 'User registered!' });
    }


};



module.exports = {
    registerAuth
}