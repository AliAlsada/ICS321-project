sql = `SELECT * FROM PACKAGE`
db.all(sql, (err, rows) => {
        if (err) return console.log(err.message);
        rows.forEach((row) => { console.log(row) });
});