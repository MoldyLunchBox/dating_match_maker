const { query, fetchInfo, saveInfo } = require("../utils/utils");
const { db } = require("../models/db");

const fetchInterests = async (req, res) => {
    try {
        const getCategories = 'SELECT *   FROM categories  ';

        let allCategories = await query(getCategories, [], db);

        const interestTags = await Promise.all(
            allCategories.map( async (category) => {
                let getInterests = 'SELECT name  FROM interests where category_id=?'
                let interests = await query(getInterests, [category.id], db);
                interests = interests.map((row)=> row.name)
                return({
                    ...category, interests: interests
                })
            })
        )
        // Further processing or returning the result to the client
        // return categories;
        res.status(200).json({ categories: interestTags });

    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Rethrow the error or handle it as needed
    }
};

module.exports = {
    fetchInterests,
};