const detectEmailPhone = require("../helper/detectEmailPhone");
const passwordGenerator = require("../helper/passGen");
const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;
const path = require("path");



// **************
//   USER LOGIN
// **************
const login = async (req, res) => {
    const { userid, pass, emailPhone } = req.body;

    if (userid && pass) {
        try {
            // Check username and password;
            const findUser = await userModel.findOne({
                $and: [
                    { user_name: userid }, { password: pass }
                ]
            });

            if (!findUser) {
                return res.status(500).json({ err: 'Incorrect username or password' })
            }


            // Create token;
            const token = jwt.sign({
                email: findUser.email, username: findUser.user_name,
                phone: findUser.whatsapp_number, id: findUser._id
            }, jwtKey);

            return res.status(200).json({ token });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: "Something went wrong" });
        }

    }
    else if (emailPhone) {
        try {
            // Check email or phone number
            const check = detectEmailPhone(emailPhone);

            // if any error send error message
            if (check.msg) {
                return res.status(500).json({ err: check.msg })
            }

            // Check existence 
            const findUser = await userModel.findOne({
                $or: [{ whatsapp_number: emailPhone }, { email: emailPhone }]
            })
            if (!findUser) {
                return res.status(500).json({ err: check.type === "email" ? "Invalid email" : "Invalid phone number" })
            }

            // Create token;
            const token = jwt.sign({
                email: findUser.email, username: findUser.user_name,
                phone: findUser.whatsapp_number, id: findUser._id
            }, jwtKey);


            // Send OTP;
            if (check.type === "email") {
                // send otp to email code;


                res.status(200).json({ token });

            } else {
                // send otp to phone code;


                res.status(200).json({ token });

            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: "Something went wrong" });
        }

    }
    else {
        return res.status(500).json({ err: "fill the require" });
    }

}


// *****************
//   USER REGISTER
// *****************
const register = async (req, res) => {
    const {
        whatsapp_number, email, full_name, nick_name,
        gender, dob, birth_time, birth_place, pin_code, country, locality, address,
        nationality, nationality_details, religion, community, medical_history, height,
        weight, marital_status, should_weight_display_on_profile, do_have_kids, father_name,
        mother_name, father_occupation, mother_occupation, no_of_siblings, sibling_details,
        family_background, family_description, family_anual_income, highest_qualification,
        school_name, ug_college_name, pg_college_name, phd_college_name,
        other_qualification_details, highest_degree, hometown, nature_of_work, industry,
        organization, designation, personal_anual_income, business_turnover,
        business_website, profile_picture, family_picture, full_body_picture, fun_picture,
        user_type, eating_preferences, how_often_you_drink, are_you_a_smoker,
        how_often_you_workout, favourite_weekend_activities, holidays_prefrences,
        how_often_you_eat_out, how_often_you_travel, prefered_social_event,
        whom_do_you_like_going_out_with, how_spiritual_are_you, how_religious_are_you,
        about_yourself, marital_status_from_year, marital_status_to_year,
        subscription_end_date, is_subscribed, category, interests
    } = req.body;


    // Check requires;
    if ([full_name, whatsapp_number, email].some((field) => !field || field == "")) {
        return res.status(500).json({ err: "fill the require" });
    }


    try {
        // Check existance of email and phone number;
        const isEmailExist = await userModel.findOne({ email });
        const isPhoneExist = await userModel.findOne({ whatsapp_number });

        if (isEmailExist) {
            return res.status(500).json({ err: "Email already exist" });
        }

        if (isPhoneExist) {
            return res.status(500).json({ err: "Whatsapp number already exist" });
        }


        // create username and check existence;
        let username = full_name.replaceAll(' ', '');
        const pass = passwordGenerator(); //genreate password
        const isUsernameExist = await userModel.countDocuments({ user_name: username });

        if (isUsernameExist > 0) {
            username = `${username}${isUsernameExist + 1}`;
        }


        // insert data
        const insert = await userModel.create({
            user_name: username, password: pass, whatsapp_number, email, full_name, nick_name,
            gender, dob, birth_time, birth_place, pin_code, country, locality, address,
            nationality, nationality_details, religion, community, medical_history, height,
            weight, marital_status, should_weight_display_on_profile, do_have_kids, father_name,
            mother_name, father_occupation, mother_occupation, no_of_siblings, sibling_details,
            family_background, family_description, family_anual_income, highest_qualification,
            school_name, ug_college_name, pg_college_name, phd_college_name,
            other_qualification_details, highest_degree, hometown, nature_of_work, industry,
            organization, designation, personal_anual_income, business_turnover,
            business_website, profile_picture, family_picture, full_body_picture, fun_picture,
            user_type, eating_preferences, how_often_you_drink, are_you_a_smoker,
            how_often_you_workout, favourite_weekend_activities, holidays_prefrences,
            how_often_you_eat_out, how_often_you_travel, prefered_social_event,
            whom_do_you_like_going_out_with, how_spiritual_are_you, how_religious_are_you,
            about_yourself, marital_status_from_year, marital_status_to_year,
            subscription_end_date, is_subscribed, category, interests
        });

        if (!insert) {
            return res.status(500).json({ err: "User not register" });
        }


        return res.status(200).json({
            username: username,
            password: pass
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ err: "Something went wrong" })
    }

}


// *************************
//  UPDATE USER PROFILE
// *************************
const update = async (req, res) => {
    const {
        whatsapp_number, email, full_name, nick_name, token,
        gender, dob, birth_time, birth_place, pin_code, country, locality, address,
        nationality, nationality_details, religion, community, medical_history, height,
        weight, marital_status, should_weight_display_on_profile, do_have_kids, father_name,
        mother_name, father_occupation, mother_occupation, no_of_siblings, sibling_details,
        family_background, family_description, family_anual_income, highest_qualification,
        school_name, ug_college_name, pg_college_name, phd_college_name,
        other_qualification_details, highest_degree, hometown, nature_of_work, industry,
        organization, designation, personal_anual_income, business_turnover,
        business_website, profile_picture, family_picture, full_body_picture, fun_picture,
        user_type, eating_preferences, how_often_you_drink, are_you_a_smoker,
        how_often_you_workout, favourite_weekend_activities, holidays_prefrences,
        how_often_you_eat_out, how_often_you_travel, prefered_social_event,
        whom_do_you_like_going_out_with, how_spiritual_are_you, how_religious_are_you,
        about_yourself, marital_status_from_year, marital_status_to_year,
        subscription_end_date, is_subscribed, category, interests, registration_status, registration_step
    } = req.body;

    if (!token) {
        return res.status(500).json({ err: "Invalid user" });
    }


    try {
        // userData come from middleware;
        const userData = req.userData;

        const update = await userModel.updateOne({ _id: userData._id }, {
            $set: {
                whatsapp_number, email, full_name, nick_name,
                gender, dob, birth_time, birth_place, pin_code, country, locality, address,
                nationality, nationality_details, religion, community, medical_history, height,
                weight, marital_status, should_weight_display_on_profile, do_have_kids, father_name,
                mother_name, father_occupation, mother_occupation, no_of_siblings, sibling_details,
                family_background, family_description, family_anual_income, highest_qualification,
                school_name, ug_college_name, pg_college_name, phd_college_name,
                other_qualification_details, highest_degree, hometown, nature_of_work, industry,
                organization, designation, personal_anual_income, business_turnover,
                business_website, profile_picture, family_picture, full_body_picture, fun_picture,
                user_type, eating_preferences, how_often_you_drink, are_you_a_smoker,
                how_often_you_workout, favourite_weekend_activities, holidays_prefrences,
                how_often_you_eat_out, how_often_you_travel, prefered_social_event,
                whom_do_you_like_going_out_with, how_spiritual_are_you, how_religious_are_you,
                about_yourself, marital_status_from_year, marital_status_to_year,
                subscription_end_date, is_subscribed, category, interests, registration_status, registration_step
            }
        })

        if (update.modifiedCount < 1) {
            return res.status(500).json({ err: "Profile updatation failed" })
        }

        return res.status(200).json({
            whatsapp_number, email, full_name, nick_name,
            gender, dob, birth_time, birth_place, pin_code, country, locality, address,
            nationality, nationality_details, religion, community, medical_history, height,
            weight, marital_status, should_weight_display_on_profile, do_have_kids, father_name,
            mother_name, father_occupation, mother_occupation, no_of_siblings, sibling_details,
            family_background, family_description, family_anual_income, highest_qualification,
            school_name, ug_college_name, pg_college_name, phd_college_name,
            other_qualification_details, highest_degree, hometown, nature_of_work, industry,
            organization, designation, personal_anual_income, business_turnover,
            business_website, profile_picture, family_picture, full_body_picture, fun_picture,
            user_type, eating_preferences, how_often_you_drink, are_you_a_smoker,
            how_often_you_workout, favourite_weekend_activities, holidays_prefrences,
            how_often_you_eat_out, how_often_you_travel, prefered_social_event,
            whom_do_you_like_going_out_with, how_spiritual_are_you, how_religious_are_you,
            about_yourself, marital_status_from_year, marital_status_to_year,
            subscription_end_date, is_subscribed, category, interests, registration_status, registration_step
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ err: "Something went wrong" })
    }

}



// *************************
//  GET USER PROFILE
// *************************
const get = async (req, res) => {
    const { fieldsArr } = req.body;
    const userData = req.userData;

    try {
        // Build query
        let query = userModel.findOne({ _id: userData._id });

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



// *************************
//  SET PROFILE PICTURES
// *************************
const upload = async (req, res) => {

    if (req.filePaths && Object.keys(req.filePaths).length < 1) {
        return res.status(500).json({ err: "No files uploaded" });
    }

    try {
        // userData come from middleware;
        const userData = req.userData;

        // Update user with file paths
        const update = await userModel.updateOne({ _id: userData._id }, {
            $set: {
                image: req.filePaths,
            }
        });

        if (update.modifiedCount < 1) {
            return res.status(500).json({ err: "Profile picture upload failed" });
        }

        return res.status(200).json({ msg: "Profile picture uploaded successfully", image: req.filePaths });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ err: "Something went wrong" });
    }

}



// *************************
//  VIEW PROFILE PICTURE
// *************************
// Get request for viewing photo; get filename from dynamic parameter;
const viewPhoto = async (req, res) => {
    const fileName = req.params.filename;

    try {
        const filePath = path.join(__dirname, '..', 'uploads', fileName);
        res.sendFile(filePath);

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ err: "Something went wrong" });
    }
}


module.exports = {
    register, update, login, get, upload,
    viewPhoto
}
