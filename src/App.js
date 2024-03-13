// App.js
import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./animation/ani.json";

import ModelList from "./ModelList";
import FeaturedList from "./FeaturedList";
import ModelDetails from "./ModelDetails";
import Generate from "./Generate";
import "./App.css";

const App = () => {
	const [models] = useState([
		{ id: 1, name: "Image-to-Text Model", category: "Computer Vision" },
		{
			id: 2,
			name: "Language Translation Model",
			category: "Natural Language Processing",
		},
		{
			id: 3,
			name: "Image Generator Model",
			category: "Image Processing Processing",
		},
		// Add more models...
	]);

	const [featuredModels] = useState([
		{ id: 1, name: "Image-to-Text Model", reason: "Most viewed" },
		// Add more featured models...
	]);

	const [selectedModel, setSelectedModel] = useState(null);

	const handleModelClick = (model) => {
		setSelectedModel(model);
	};

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
									<Lottie animationData={animationData} className="animation" style={{width:"50%"}} />
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
								<FeaturedList
									featuredModels={featuredModels}
									onModelClick={handleModelClick}
								/>
								<div id="browse" style={{ width: "100%", marginTop: "20px" }}>
									<ModelList models={models} onModelClick={handleModelClick} />
								</div>
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
