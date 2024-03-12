import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationFeatured from "./animation/animationFeatured.json";
import animationFire from "./animation/animationFire.json";

const FeaturedList = ({ featuredModels, onModelClick }) => {
  return (
    <div className="modyContainer">
      <div className="mody">
        <div className="topi">
          <h2>Featured Model:</h2>
          <div className="ani1">
            <Lottie animationData={animationFire}></Lottie>
          </div>
        </div>
        <div className="moye">
          <div className="oye">
            <div className="ani2">
              <Lottie animationData={animationFeatured}></Lottie>
            </div>
          </div>
          <div className="conte">
            <div>
              <h2
                style={{
                  marginLeft: "150px",
                  paddingTop: "40px",
                  fontWeight: "1000",
                }}
              >
                Image-to-Text Transformer
              </h2>
              <p
                style={{
                  fontSize: "20px",
                  paddingTop: "40px",
                  marginLeft: "50px",
                  paddingRight: "40px",
                  fontStyle: "italic",
                }}
              >
                Exceptional Accuracy, Beloved by Developers. Renowned for
                converting images into precise text, our Image-to-Text
                Transformer earns its featured status through widespread
                developer acclaim. Its consistent high performance and ability
                to extract valuable insights make it a cherished gem in the AI
                landscape.
              </p>
            </div>
          </div>
        </div>
        <div className="btnContainer">
          {/* <div className="featured-list">
            {featuredModels.map((model) => (
              <div
                className="featured-card"
                key={model.id}
                onClick={() => onModelClick(model)}
              >
                {model.name}
              </div>
            ))}
          </div> */}
          <div>
            <a href="/generate" target="_blank" rel="noopener noreferrer">
              <button className="featured-card">Try</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedList;
