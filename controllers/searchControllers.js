
const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const searchQueries = require("../models/search");




const searchResults = async (req, res) => {

    const { searchedBarcode, searchedCatagory, searchedCity, searchedState, searchedCondition} = req.body;
    // const customerID = await getCustomerID(req);
    const customerID = req.session.user.id;

    if (searchedBarcode) {
        const result = await searchQueries.searchBarcode(searchedBarcode);
        return res.render("results", { user: req.session.user, packages: result, id: customerID });
    }

    else if (searchedCatagory) {
        const result = await searchQueries.searchCatagory(customerID, searchedCatagory);
        return res.render("results", { user: req.session.user, packages: result, id: customerID });
    }

    else if (searchedCity) {
        const result = await searchQueries.searchCity(customerID, searchedCity);
        return res.render("results", { user: req.session.user, packages: result, id: customerID });
    }

    else if (searchedState) {
        const result = await searchQueries.searchState(customerID, searchedState);
        return res.render("results", { user: req.session.user, packages: result, id: customerID });
    }

    else if (searchedCondition) {
        const result = await searchQueries.searchedCondition(customerID, searchedCondition);
        return res.render("results", { user: req.session.user, packages: result, id: customerID });
    }


    else {
        const result = await searchQueries.searchAll(customerID);
        if (result !== undefined) {
            if (result.length > 1)
                return res.render("results", { user: req.session.user, packages: result, id: customerID });
            return res.render("results", { user: req.session.user, packages: [result], id: customerID });
        }
    }

}





module.exports = {
    searchResults,
}