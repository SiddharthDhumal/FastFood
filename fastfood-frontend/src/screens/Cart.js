import React from "react";
// import Delete from "@material-ui/icons/Delete";
// import { Delete } from "@material-ui/icons";
import { useCart, useDispatch } from "../components/ContextReducer";
export default function Cart() {
	let data = useCart();
	let dispatch = useDispatch();
	if (data.length === 0) {
		return (
			<div>
				<div className="m-5 w-100 text-center fs-3 text-white">
					The Cart is Empty!
				</div>
			</div>
		);
	}
	// const handleRemove = (index)=>{
	//   console.log(index)
	//   dispatch({type:"REMOVE",index:index})
	// }

	const handleCheckOut = async () => {
		let userEmail = localStorage.getItem("userEmail");
		// console.log(data,localStorage.getItem("userEmail"),new Date())
		let response = await fetch("http://localhost:5000/api/OrderData", {
			// credentials: 'include',
			// Origin:"http://localhost:3000/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				order_data: data,
				email: userEmail,
				order_date: new Date().toDateString(),
			}),
		});
		console.log("JSON RESPONSE:::::", response.status);
		if (response.status === 200) {
			dispatch({ type: "DROP" });
		}
	};

	let totalPrice = data.reduce((total, food) => total + food.price, 0);

	// console.log(data);
	console.log(totalPrice);
	return (
		<div>
			{/* {console.log(data)} */}
			<div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
				<table className="table table-hover ">
					<thead className=" text-success fs-4">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Quantity</th>
							<th scope="col">Option</th>
							<th scope="col">Amount</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{data.map((food, index) => (
							<tr>
								<th scope="row">{index + 1}</th>
								<td>{food.name}</td>
								<td>{food.qty}</td>
								<td>{food.size}</td>
								<td>{food.price}</td>
								<td>
									<button type="button" className="btn p-0">
										{/* <Delete
											onClick={() => {
												dispatch({ type: "REMOVE", index: index });
											}}
										/> */}

										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24"
											viewBox="0 0 24 24"
											width="24"
											onClick={() => {
												dispatch({ type: "REMOVE", index: index });
											}}
										>
											<path d="M0 0h24v24H0z" fill="none" />
											<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
										</svg>
									</button>{" "}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div>
					<h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
				</div>
				<div>
					<button className="btn bg-success mt-5 " onClick={handleCheckOut}>
						{" "}
						Check Out{" "}
					</button>
				</div>
			</div>
		</div>
	);
}
