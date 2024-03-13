// App.js
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./animation/ani.json";
import axios from "axios";
import ModelList from "./ModelList";
import FeaturedList from "./FeaturedList";
import ModelDetails from "./ModelDetails";
import Generate from "./Generate";
import "./App.css";

const App = () => {
	const [models, setModels] = useState([]);
	const [featuredModels, setFeaturedModels] = useState([]);
	const getModels = async () => {
		const response = await axios.get("http://localhost:4000/models");
		if (response.status == 200) {
			setModels(response.data);
		}
		console.log(response);
	};
	const getFeaturedModels = async () => {
		const response = await axios.get("http://localhost:4000/featuredModels");
		if (response.status === 200) {
			setFeaturedModels(response.data);
		}
		console.log(response);
	};
	const [selectedModel, setSelectedModel] = useState(null);

	const handleModelClick = (model) => {
		setSelectedModel(model);
	};
	useEffect(() => {
		getModels();
		getFeaturedModels();
	}, []);
	console.log(featuredModels,models)
	const scrollRef = useRef(null);

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			window.scrollTo({
				top: section.offsetTop,
				behavior: "smooth",
			});
		}
	};

	const handleNavLinkClick = (sectionId) => {
		scrollToSection(sectionId);
	};

	return (
		<Router>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{/* NavBar */}
				<nav className="navbar">
					<Link to="/" onClick={() => handleNavLinkClick("top")}>
						About Us
					</Link>
					<Link to="/" onClick={() => handleNavLinkClick("featured")}>
						Featured
					</Link>
					<Link to="/" onClick={() => handleNavLinkClick("browse")}>
						Browse
					</Link>
				</nav>

				{/* Main Content */}
				<Routes>
					<Route
						path="/"
						element={
							<React.Fragment>
								<div className="head">
									<Lottie
										animationData={animationData}
										className="animation"
										style={{ width: "50%" }}
									/>
									<div style={{ width: "50%" }}>
										<p style={{ fontSize: "102px", fontWeight: "1000" }}>
											AI Models
										</p>
										<p style={{ fontSize: "40px" }}>
											Unleashing AI Brilliance, Where Models Transform Ideas
											into Reality!
										</p>
									</div>
								</div>
								{featuredModels.length > 0 && (
									<FeaturedList
										featuredModels={featuredModels}
										onModelClick={handleModelClick}
									/>
								)}
								{models.length > 0 && (
									<div id="browse" style={{ width: "100%", marginTop: "20px" }}>
										<ModelList
											models={models}
											onModelClick={handleModelClick}
										/>
									</div>
								)}

								{selectedModel && (
									<ModelDetails selectedModel={selectedModel} />
								)}
							</React.Fragment>
						}
					/>
					<Route path="/generate" element={<Generate />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
