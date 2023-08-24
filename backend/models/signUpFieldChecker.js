const { fetchInfo } = require("../utils/utils");

const fieldChecker = async (req, res) => {
    try {
        const {username} = req.body
        if (!username){
            console.log("user empty")
            return res.status(200).json({ error: "empty field" });
        }
        console.log(username)
        const users = await fetchInfo("users","id", "username =?", username)
        if (users.length){
            console.log("user exists")
            return res.status(200).json({ error: "user exists" });
        }
        else
        return res.status(200).json({ msg: true });


    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Rethrow the error or handle it as needed
    }
};

module.exports={
    fieldChecker,
}