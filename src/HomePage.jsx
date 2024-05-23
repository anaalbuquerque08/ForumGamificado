import React from "react";
import "./HomePage.css";
import Menu from "./Menu";
import Comments from "./Comments";
import SearchAndAd from "./SearchAndAd";

function HomePage() {
  return (
    <div className="HomePage">
      <div className="Menu">
        <Menu />
      </div>
      <div className="Comments">
        <Comments />
      </div>
      <div className="SearchAndAd">
        <SearchAndAd />
      </div>
    </div>
  );
}

export default HomePage;
