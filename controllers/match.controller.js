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

// ****** for Testing purpose ******
const get = async (req, res) => {
    const { fieldsArr, userId } = req.body;

    try {
        let query = userModel.findOne({ _id: userId });

        // Add select clause if specific fields requested
        if (fieldsArr && Array.isArray(fieldsArr)) {
            const safeFields = fieldsArr.filter(field => field !== "password"); //Remove password field;
            const selectFields = safeFields.join(" ");

            query = query.select(selectFields)

        } else {
            query = query.select("-password");
        }

        const data = await query;

        if (!data) {
            return res.status(404).json({ err: "User data not found" });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ err: "Something went wrong" });
    }

};


module.exports = {
    add, get
}
