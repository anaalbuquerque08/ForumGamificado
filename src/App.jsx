import React from "react";
import RoutesApp from "./RoutesApp";
import { AuthProvider } from "./contexts/AuthContext";
import AppBar from "./AppBar";
import Banner from "./Banner";
import "./App.css"; 

function App() {
  return (
   <AuthProvider>
    <div className="App">
          <AppBar />
          <Banner />
          <RoutesApp />
        </div>
   </AuthProvider>
     
  );
}

export default App;
