import React from "react";
import "./Home.css";
import HomePage from "../HomePage";
import AppBar from "../AppBar"; 


function Home() {

  return (
    <div className="containerHome"> 
      <AppBar/>
      <HomePage/>
    </div>
  );
};

export default Home;


