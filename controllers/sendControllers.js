
const sendQueries = require("../models/send")



const shipPackage = async (req, res) => {

    // const senderID = await sendQueries.getSenderID(req)
    const senderID = req.session.user.id

    await sendQueries.saveCustomer(req, res);
    await sendQueries.savePackage(req, res, senderID);
    return res.render("index", {user: req.session.user});
}


module.exports = {
    shipPackage,
}