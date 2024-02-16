const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "asdkhaskdsalkfjklasdklasjlkjasd";

router.post(
	"/createuser",
	body("email").isEmail(),
	body("name").isLength({ min: 5 }),
	body("password", "Incorrect Password").isLength({ min: 5 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const salt = await bcrypt.genSalt(10);

		const secPassword = await bcrypt.hash(req.body.password, salt);

		// const { name, email, location } = await req.body;

		// console.log(name, email, secPassword, location);

		// User.create({
		// 	name: req.body.name,
		// 	password: secPassword,
		// 	email: req.body.email,
		// 	location: req.body.location,
		// })
		// 	.then((result1) => {
		// 		console.log(result1);
		// 		return result1;
		// 	})
		// 	.then((result2) => {
		// 		console.log(result2);
		// 	});

		try {
			// console.log("we are here");

			const newUser = await User.create({
				name: req.body.name,
				password: secPassword,
				email: req.body.email,
				location: req.body.location,
			});

			await newUser.save();

			// res.status(201).send(result);

			// console.log("data is here ", result);

			// res.send(result);
			res.json({ success: true });
		} catch (error) {
			console.log("error is here");
			console.log(error);
			res.json({ success: false });
		}
	}
);

router.post(
	"/loginuser",
	body("email").isEmail(),
	body("password", "Incorrect Password").isLength({ min: 5 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const email = req.body.email;
		try {
			let userData = await User.findOne({ email });

			console.log(userData);

			if (!userData) {
				return res
					.status(400)
					.json({ errors: "Try logging with correct credentials" });
			}

			// console.log(req.body.password);
			// console.log(userData.password);

			const pwdPassword = await bcrypt.compare(
				req.body.password,
				userData.password
			);

			if (!pwdPassword) {
				return res
					.status(400)
					.json({ errors: "Try logging with correct credentials" });
			}

			const data = {
				user: {
					id: userData.id,
				},
			};

			const authToken = jwt.sign(data, jwtSecret);

			return res.json({ success: true, authToken: authToken });
		} catch (error) {
			console.log(error);
			res.json({ success: false });
		}
	}
);

module.exports = router;
