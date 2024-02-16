const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	order_data: {
		type: Array,
		required: true,
	},
});

const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = Orders;
