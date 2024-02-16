const express = require("express");
const app = express();
const cors = require("cors");
const { connectToMongo } = require("./db");

connectToMongo();

const port = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, x-Requested-With,Content-Type,Accept"
	);

	next();
});

// mongoose.connect("mongodb://localhost:27017/fastfoodDB").then(() => {
// 	console.log("DB connected");
// });

app.get("/", async (req, res) => {
	res.send("Hello world");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrdersData"));

app.listen(port, () => {
	console.log(`App is listening at port ${port}`);
});
