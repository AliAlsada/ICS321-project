const bcrypt = require("bcryptjs");
const db = require("./dbConnection");
db.get("PRAGMA foreign_keys = ON");





const adminLogInAuth = (req, res) => {
     res.render("index", {user: req.session.user});          
}

module.exports = {
    adminLogInAuth
}
