const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const searchQueries = require("../models/search");


const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfumex.db',
        driver: sqlite3.Database
    })
}

const trackResults = async (req, res) => {
    const barcode = req.params.barcode;


        //get history
        const history = await searchQueries.trackResults(req.params.barcode);
        const locations = await searchQueries.getLocations();
    
        const states = ["DELIVERED", "IN_TRANSIT", "AVAILABLE", "LOST"];
        const package = await searchQueries.searchBarcode(barcode);
    
        let state;
        
        for (let j = 0; j < states.length; j++) {
            if (await searchQueries.getState(package[0].barcode, states[j])) {
                state = states[j]
            }
        } 
    
        res.render("track", {history: history,  locations: locations, state: state, barcode: barcode})

}




module.exports = {
    trackResults,
}