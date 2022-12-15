const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex.db',
        driver: sqlite3.Database
    })
}

const trackResults = async (req, res) => {
    const barcode = req.params.barcode;

    //connect to the database
    const db = await getDbConnection();

    //get history of the package from the database
    const row = await db.all(`SELECT * FROM HISTORY WHERE barcode = ${barcode} ORDER BY DATE`);
    
    //retreive the location name from location table by using the location num that is given in history table
    if (row.length > 0){
        row.forEach( async record => {
            const location =  await db.get(`SELECT country, city, name FROM LOCATION WHERE location_num = ${record.location_num}`);
            record["location_name"] = location; //add country and city name and name to the row that is taken from the history table
        })
    }


    //retreive the state of the package


    await db.close()

    console.log(row) 

    //send the data to the ejs
    return res.render(`track`, {user: req.session.user, history: row});

}




module.exports = {
    trackResults,
}