import React from "react";
import RoutesApp from "./RoutesApp";
import { AuthProvider } from "./contexts/AuthContext";
import AppBarOut from "./AppBarOut";
  

import "./App.css"; 

function App() {
  return (
   <AuthProvider>
          <AppBarOut />
          <RoutesApp />
             
   </AuthProvider>
   
     
  );
}

export default App;
