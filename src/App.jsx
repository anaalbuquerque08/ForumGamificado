import React from "react";
import RoutesApp from "./RoutesApp";
import { AuthProvider } from "./contexts/AuthContext";
import AppBar from "./AppBar"; 
import ProfileEditor from "./ProfileEditor";
  
import "./App.css"; 

function App() {
  return (
   <AuthProvider>
          <AppBar />
          <RoutesApp />
          <ProfileEditor/>
             
   </AuthProvider>
     
  );
}

export default App;
