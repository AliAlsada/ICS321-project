const bcrypt = require("bcryptjs");
const db = require("../controllers/dbConnection");
db.get("PRAGMA foreign_keys = ON");

const userLogInAuth = (req, res, next) => {

    const logedPassword = req.body.password.toString()
    const email = req.body.email
    

    sql = `SELECT a.account_id, a.email, a.password FROM ACCOUNT a INNER JOIN USER_ACCOUNT u WHERE email = ?`;
    db.get(sql, [email], (err, row) => {

        //check if the email is in the database
        if (row == undefined) return res.render("logIn", {message: 'this email is not registered'});
 
        //validate password
        bcrypt.compare(logedPassword, row.password, (err, result) => {        
            if (result) {
                id = row.account_id

                req.session.authenticated = true;
                req.session.user = {id,email};
                next()
                
            }
            else res.render("logIn", {message: 'Password is not correct'});
        })
    })
}

module.exports = {userLogInAuth}