const matchModel = require("../models/matches.model");
const userModel = require("../models/users.model");


const add = async (req, res) => {
    const userData = req.userData;

    try {
        const allUser = await userModel.find({ is_subscribed: false });
        console.log(allUser);


    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Something went wrong" });
    }

}


module.exports = {
    add
}
