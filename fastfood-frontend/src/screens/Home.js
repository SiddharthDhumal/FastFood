import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export const Home = () => {
	const [foodCategory, setFoodCategory] = useState([]);
	const [foodItem, setFoodItem] = useState([]);
	const [search, setSearch] = useState("");

	const loadData = async () => {
		let response = await fetch("http://localhost:5000/api/foodData", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		});

		response = await response.json();

		setFoodItem(response.allData);
		setFoodCategory(response.categoryData);
		// console.log(response.allData, response.categoryData);
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div
			className="bg-dark text-white row mb-3"
			// style={{ backgroundColor: "#212529", height: "100vh" }}
		>
			<div>
				<Navbar />
			</div>
			<div>
				<div
					id="carouselExampleFade"
					className="carousel slide carousel-fade"
					data-bs-ride="carousel"
					style={{ objectFit: "contain !important" }}
				>
					<div className="carousel-inner" id="carousel">
						<div className="carousel-caption" style={{ zIndex: "10" }}>
							<div className="d-flex justify-content-center">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Search"
									aria-label="Search"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								{/* <button
									className="btn btn-outline-success text-white bg-success"
									type="submit"
								>
									Search
								</button> */}
							</div>
						</div>
						<div className="carousel-item active">
							<img
								src="https://source.unsplash.com/random/700×900/?burger"
								className="d-block w-100"
								style={{ filter: "brightness(30%" }}
								alt="..."
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://source.unsplash.com/random/700×900/?pizza"
								className="d-block w-100"
								style={{ filter: "brightness(30%" }}
								alt="..."
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://source.unsplash.com/random/700×900/?momo"
								className="d-block w-100"
								style={{ filter: "brightness(30%" }}
								alt="..."
							/>
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleFade"
						data-bs-slide="prev"
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleFade"
						data-bs-slide="next"
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<div className="container">
				{foodCategory.length > 0 ? (
					foodCategory.map((data, id) => (
						<div className="row mb-3">
							<div key={id + 1} className="fs-3 m-3">
								{data.CategoryName}
							</div>
							<hr />
							{foodItem.length > 0 ? (
								foodItem
									.filter(
										(item) =>
											item.CategoryName === data.CategoryName &&
											item.name.toLowerCase().includes(search.toLowerCase())
									)
									.map((filteredItems, id) => (
										<div key={id + 1} className="col-12 col-md-6 col-lg-3">
											<Card
												foodItems={filteredItems}
												// foodName={filteredItems.name}
												options={filteredItems.options[0]}
												// imgSrc={filteredItems.img}
											/>
										</div>
									))
							) : (
								<div>No Such Data Found</div>
							)}
						</div>
					))
				) : (
					<></>
				)}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};
