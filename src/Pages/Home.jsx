import React from "react";
import "./Home.css";
import HomePage from "../HomePage";
import AppBar from "../AppBar";
import { ScoreProvider } from "../ScoreContext"; 

function Home() {
  return (
    <div className="containerHome">
      <AppBar />
      <ScoreProvider>
        <HomePage />
      </ScoreProvider>
    </div>
  );
}

export default Home;
