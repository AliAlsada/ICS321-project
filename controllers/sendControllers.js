
const sendQueries = require("../models/send")



const shipPackage = async (req, res) => {
    const {country, city, fname, lname, 
        phone, email, weight, value, catagory, deliveryDate} = req.body;

    const senderID = await sendQueries.getSenderID(req)

    await sendQueries.saveCustomer(req, res);
    await sendQueries.savePackage(req, res, senderID);
    return res.render("index", {user: req.session.user});
}


module.exports = {
    shipPackage,
}