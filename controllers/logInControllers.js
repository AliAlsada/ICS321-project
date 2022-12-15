const bcrypt = require("bcryptjs");
const logInQueries = require("../models/logIn")
const adminQueries = require("../models/admin")



const logInAuth = async (req, res) => {
    const logedPassword = req.body.password.toString()
    const email = req.body.email


    const userInfo = await logInQueries.getCustomerAccountInfo(email);
    const adminInfo = await logInQueries.getAdminAccountInfo(email);

    if (userInfo) {

        //unhash password
        bcrypt.compare(logedPassword, userInfo.password, (err, result) => {
            if (result) {
                id = userInfo.account_id

                req.session.authenticated = true;
                req.session.user = { id, email };
                res.render("index", { user: req.session.user });

            }
        });
    }

    else if (adminInfo) {
        //unhash password
        if (logedPassword === adminInfo.password){
            id = adminInfo.account_id

            req.session.authenticated = true;
            req.session.user = { id, email };

            //------------------------------------------------------------------------
            res.render("adminIndex", { user: req.session.user, customers: await adminQueries.getAllCustomers()});
        }


    }

    else res.render("logIn", { message: 'Password is not correct' });
}




module.exports = {
    logInAuth,
}
