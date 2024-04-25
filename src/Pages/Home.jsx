import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuth from "../useAuth";


function Home() {
    const { signout } = useAuth();
    const navigate = useNavigate();

  return (
    <div className="containerHome">
      <h2 className="title">Home</h2>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]} >
        Sair
      </Button>
    </div>
  );
};

export default Home;
