const express = require("express");
const router = express.Router();
const { closeMongoConnection, getAllData, getCategoryData } = require("../db");

router.get("/foodData", async (req, res) => {
	try {
		// Replace 'your-collection-name' with the actual name of your collection
		const collectionName = "fastfoodCollection";

		const categoryName = "foodCatergory";

		// Get all data from the collection
		const allData = await getAllData(collectionName);
		const categoryData = await getCategoryData(categoryName);

		// Do something with the retrieved data
		// console.log("All data:", allData);
		res.send({ allData, categoryData });
	} catch (error) {
		console.error(error.message);
		res.send("Server error");
	}
});

module.exports = router;
