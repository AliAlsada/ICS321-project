const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to the DB
const db = new  sqlite3.Database('./kfumex.db', sqlite3.OPEN_READWRITE, 
(err) => {
        if (err) return console.log(err.message);
        else console.log('connected to the SQLlite database');
});

//create Tables