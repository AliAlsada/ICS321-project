

const sqlite3 = require('sqlite3').verbose();

//connect to the DB
const db = new sqlite3.Database('./kfumex.db', sqlite3.OPEN_READWRITE, 
    (err) => {
    if (err) return console.log(err.message);
    else console.log("connected to the database");
    });

module.exports = db;
