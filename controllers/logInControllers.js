const bcrypt = require("bcryptjs");
const db = require("./dbConnection");

const userLogInAuth = (req, res) => {

    const logedPassword = req.body.password.toString()
    const email = req.body.email
    

    sql = `SELECT a.account_id, a.email, a.password FROM ACCOUNT a INNER JOIN USER_ACCOUNT u WHERE email = ?`;
    db.get(sql, [email], (err, row) => {

        //unhash password


        //check if the email is in the database
        if (row == undefined) return res.render("logIn", {message: 'this email is not registered'});
 
        //validate password
        bcrypt.compare(logedPassword, row.password, (err, result) => {
            console.log(logedPassword)
            
            if (result) res.render("index");
            else res.render("logIn", {message: 'Password is not correct'});
        })
        // else if (validpass) return res.render("logIn", {message: 'Password is not correct'});

        // else{
        //     res.render("index");
        // }

    })
}

module.exports = {
    userLogInAuth
}
