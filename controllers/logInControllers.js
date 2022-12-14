const bcrypt = require("bcryptjs");
const logInQueries = require("../models/logIn")



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
        bcrypt.compare(logedPassword, adminInfo.password, (err, result) => {
            if (result) {
                id = adminInfo.account_id

                req.session.authenticated = true;
                req.session.user = { id, email };

                //------------------------------------------------------------------------
                res.render("adminPage", { user: req.session.user });

            }
        });

    }

    else res.render("logIn", { message: 'Password is not correct' });
}



module.exports = {
    logInAuth,
}
