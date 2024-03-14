// ModelDetails.js
import React, { useRef, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import axios from "axios";
import DescriptionText1 from "./Description/d1";
import DescriptionText2 from "./Description/d2";
import DescriptionText3 from "./Description/d3";
import Scenario1Text1 from "./Scenario1/s11";
import Scenario1Text2 from "./Scenario1/s12";
import Scenario1Text3 from "./Scenario1/s13";

const getScenarioComponent = (id, scenarioNumber) => {
	switch (id) {
		case 1:
			return scenarioNumber === 1 ? <Scenario1Text1 /> : null;
		case 2:
			return scenarioNumber === 1 ? <Scenario1Text2 /> : null;
		case 3:
			return scenarioNumber === 1 ? <Scenario1Text3 /> : null;
		default:
			return null;
	}
};

const ModelDetails = ({ selectedModel }) => {
	const codeRef = useRef(null);
	const [description, setDescription] = useState(null);
	const [scenario1, setScenario1] = useState({
		text: null,
		isOpen: true,
	});
	const [code, setCode] = useState({ text: null, isOpen: false });
	const [useCasesOpen, setUseCasesOpen] = useState(false);
	const [messageCopied, setMessageCopied] = useState("");
	const [response, setResponse] = useState(false);
	const [modelCodes,setModelCodes] = useState([]);
	const getModelCodes = async ()=>{
		const response = await axios.get("http://localhost:4000/models");
		console.log(response.data)
		if(response.status==200){
			var x = [];
			response.data.map((value)=>{
				x.push(value.modelsCode);
			})
			setModelCodes(x);
		}
	}
	useEffect(() => {
        getModelCodes();
    }, []);
	const handleCopyClick = () => {
		setMessageCopied(code.text);

		if (messageCopied.length > 0) {
			setResponse(true);
		}
		setTimeout(() => {
			setResponse(false);
		}, 3000);
	};
	const loadDescription = () => {
		setDescription(getDescriptionComponent(selectedModel.id));
		setScenario1((prevState) => ({ ...prevState, isOpen: false })); // Close the Use Cases section
		setCode((prevState) => ({ ...prevState, isOpen: false })); // Close the Code section
		setUseCasesOpen(false); // Ensure Use Cases tab is closed
	};
	
	const getDescriptionComponent = (id) => {
		switch (id) {
			case 1:
				return <DescriptionText1 />;
			case 2:
				return <DescriptionText2 />;
			case 3:
				return <DescriptionText3 />;
			default:
				return null;
		}
	};

	const loadCode = () => {
		setCode({ text: modelCodes[selectedModel.id - 1], isOpen: true });
		setDescription(null);
		setUseCasesOpen(false);
	};	
	const loadScenario1 = () => {
		setDescription(null);
		setScenario1({
			text: getScenarioComponent(selectedModel.id, 1),
			isOpen: true,
		});
		setCode({ isOpen: false }); // Make sure to set isOpen to false only for the code section
		setUseCasesOpen(true);
	};
    

	useEffect(() => {
		loadDescription();

		// Update Use Cases text when switching models
		if (useCasesOpen) {
			loadScenario1();
		}

		// Update Code section when switching models
		if (code.isOpen) {
			loadCode();
		}
	}, [selectedModel]);

	return (
		<div className="modyContainer">
			<div
				className="model-details-container"
				style={{
					backgroundColor: "#343a45",
					color: "white",
					width: "76%",
					margin: "20px",
					borderRadius: "10px",
					marginTop: "19px",
					padding: "40px",
				}}
			>
				<h2>{selectedModel.name} Details</h2>
				<Tabs>
					<TabList
						style={{
							backgroundColor: "#343a45",
							color: "#ADD8E6",
							display: "flex",
							justifyContent: "space-around",
							marginBottom: "20px",
						}}
					>
						<Tab onClick={loadDescription}>Description</Tab>
						<Tab onClick={loadCode}>Code</Tab>
						<Tab onClick={loadScenario1}>Use Cases</Tab>
					</TabList>

					<TabPanel>
						<div className="model-details">{description && description}</div>
					</TabPanel>

					<TabPanel>
						<div style={{display:"flex",flexDirection:"column",flexWrap:"wrap",alignContent:"end"}}>
							<button style={{width:"25%",height:"50px",borderColor:"#ffffff",borderRadius:"10px",cursor:"pointer"}} onClick={handleCopyClick}>
								Copy to Clipboard
							</button>
							{response && <p style={{ color: "#4AC1F5" }}>Copied to clipboard</p>}
						</div>
						<div className="code-section">
							{code.isOpen && (
								<SyntaxHighlighter
									language="javascript"
									style={materialDark}
									ref={codeRef}
									id="code-text-input"
									className="light-syntax-highlighter"
								>
									{code.text}
								</SyntaxHighlighter>
							)}
						</div>
					</TabPanel>

					<TabPanel>
						<div className="model-details">
							{useCasesOpen && (
								<div>
									<p>{getScenarioComponent(selectedModel.id, 1)}</p>
								</div>
							)}
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default ModelDetails;
