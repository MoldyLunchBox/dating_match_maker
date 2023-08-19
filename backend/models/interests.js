const { query, fetchInfo, saveInfo } = require("../utils/utils");
const { db } = require("../models/db");

const fetchInterests = async (req, res) => {
    try {
        const getCategories = 'SELECT *   FROM categories  ';

        let allCategories = await query(getCategories, [], db);

        console.log("all users are", allCategories)
        const interestTags = await Promise.all(
            allCategories.map( async (category) => {
                let getInterests = 'SELECT name, id FROM interests where id=?'
                let interests = await query(getInterests, [category.id], db);
                console.log("cat id", category.id, "interest id", interests[0].id)
                console.log(interests)
                return({
                    ...category, interests: interests.name
                })
            })
        )
        console.log("the end", interestTags)
        // Further processing or returning the result to the client
        // return categories;
        res.status(200).json({ categories: allCategories, interests: null });

    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Rethrow the error or handle it as needed
    }
};

module.exports = {
    fetchInterests,
};