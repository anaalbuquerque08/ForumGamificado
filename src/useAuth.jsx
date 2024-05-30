import React from "react";
import { AuthContext } from "./contexts/AuthContext";

function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}

export default useAuth;
