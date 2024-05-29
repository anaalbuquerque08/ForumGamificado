import React, { useState } from "react";
import "./Home.css";
import HomePage from "../HomePage";
import Menu from "../Menu";
import SearchAndAd from "../SearchAndAd";
import AppBar from "../AppBar";
import { ScoreProvider } from "../ScoreContext";

function Home() {
  const [activeComponent, setActiveComponent] = useState("Comments");

  const handleMenuClick = () => {
    setActiveComponent("Menu");
  };

  const handleHomeClick = () => {
    setActiveComponent("Comments");
  };

  const handleSearchClick = () => {
    setActiveComponent("SearchAndAd");
  };

  return (
    <div className="containerHome">
      <AppBar
        onMenuClick={handleMenuClick}
        onHomeClick={handleHomeClick}
        onSearchClick={handleSearchClick}
      />
      <ScoreProvider>
        {activeComponent === "Comments" && <HomePage />}
        {activeComponent === "Menu" && <Menu />}
        {activeComponent === "SearchAndAd" && <SearchAndAd />}
      </ScoreProvider>
    </div>
  );
}

export default Home;
