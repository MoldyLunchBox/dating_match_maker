const { fetchInfo } = require("../utils/utils");

const fieldChecker = async (req, res) => {
    try {
        const { username } = req.body
        if (!username) {
            console.log("user empty")
            return res.status(200).json({ error: "empty field" });
        }
        console.log(username)
        const users = await fetchInfo("users", "id", "username =?", username)
        if (users.length) {
            console.log("user exists")
            return res.status(200).json({ error: "user exists" });
        }
        else
            return res.status(200).json({ msg: true });


    } catch (error) {
        console.error("Error fieldchecker:", error);
        throw error; // Rethrow the error or handle it as needed
    }
};

const emailChecker = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            console.log("email empty")
            return res.status(200).json({ error: "field must not be empty" });
        }
        const users = await fetchInfo("users", "id", "email =?", email)
        if (users.length) {
            console.log("user exists")
            return res.status(200).json({ error: "email is not available" });
        }
        else
            return res.status(200).json({ msg: true });
    }catch (err) {
        console.error("Erroremail checker", err);

        throw err
    }
}

module.exports = {
    fieldChecker,
    emailChecker
}