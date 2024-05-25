import React from "react";
import RoutesApp from "./RoutesApp";
import { AuthProvider } from "./contexts/AuthContext";
import AppBar from "./AppBar"; 
  
import "./App.css"; 

function App() {
  return (
   <AuthProvider>
          <AppBar />
          <RoutesApp />
             
   </AuthProvider>
     
  );
}

export default App;
