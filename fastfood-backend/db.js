const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

// Replace the connection string with your MongoDB URI
const connectionString = "mongodb://127.0.0.1:27017/fastfoodDB";

// Create a global object to manage the MongoDB connection
const mongoClient = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let db;

// Connect to the database
// async function connectToMongo() {
// 	try {
// 		await mongoClient.connect();

// 		console.log("Connected to MongoDB");
// 		db = mongoClient.db();
// 	} catch (error) {
// 		console.error("Error connecting to MongoDB:", error);
// 	}
// }

const connectToMongo = async () => {
	mongoose.connect("mongodb://127.0.0.1:27017/fastfoodDB");

	db = mongoClient.db();

	console.log("DB connected newly");
};

// Close the MongoDB connection
function closeMongoConnection() {
	if (mongoClient) {
		mongoClient.close();
		console.log("MongoDB connection closed");
	}
}

// Function to get all data from a collection
async function getAllData(collectionName) {
	try {
		// console.log(collectionName);
		const collection = await db.collection(collectionName);

		const result = await collection.find({}).toArray();

		return result;
	} catch (error) {
		console.error("Error retrieving data:", error);
		throw error;
	}
}

async function getCategoryData(categoryName) {
	const categoryCollection = await db.collection(categoryName);
	const result = await categoryCollection.find({}).toArray();

	return result;
}

module.exports = {
	connectToMongo,
	closeMongoConnection,
	getAllData,
	getCategoryData,
};
