import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useCart } from "./ContextReducer";
const Card = ({ options, foodItems }) => {
	const dispatch = useDispatch();
	// console.log(typeof options);
	let data = useCart();
	const prizeRef = useRef();
	let priceOptions = Object.keys(options);
	const [qty, setQty] = useState(1);
	const [size, setSize] = useState("");

	const handleAddtoCart = async () => {
		let food = [];
		for (const item of data) {
			if (item.id === foodItems._id) {
				food = item;
				break;
			}
		}

		if (food.length !== 0) {
			if (food.size === size) {
				await dispatch({
					type: "UPDATE",
					id: foodItems._id,
					price: foodItems.price,
					qty: qty,
				});
				return;
			} else if (food.size !== size) {
				await dispatch({
					type: "ADD",
					id: foodItems._id,
					name: foodItems.name,
					price: foodItems.price,
					qty,
					size,
				});
				return;
			}
			return;
		}

		await dispatch({
			type: "ADD",
			id: foodItems._id,
			name: foodItems.name,
			price: foodItems.price,
			qty,
			size,
		});

		console.log(data);
	};

	let finalPrice = qty * parseInt(options[size]);

	useEffect(() => {
		setSize(prizeRef.current.value);
	}, []);

	return (
		<div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
			<img
				src={foodItems.img}
				className="card-img-top"
				height="200px"
				alt="food-img"
				style={{ objectFit: "fill", height: "120px" }}
			/>
			<div className="card-body">
				<h5 className="card-title">{foodItems.name}</h5>
				<div className="container w-100">
					<select
						className="m-2 h-100 bg-success rounded"
						style={{ color: "white" }}
						onChange={(e) => setQty(e.target.value)}
					>
						{Array.from(Array(6), (e, i) => {
							return (
								<option key={i + 1} value={i + 1}>
									{i + 1}
								</option>
							);
						})}
					</select>

					<select
						className="m-2 h-100  bg-success rounded"
						style={{ color: "white" }}
						onChange={(e) => setSize(e.target.value)}
						ref={prizeRef}
					>
						{priceOptions.map((data) => {
							return <option key={data}>{data}</option>;
						})}
					</select>
					<div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
					<hr />
					<button
						className="btn btn-success justify-center ms-2"
						onClick={handleAddtoCart}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
