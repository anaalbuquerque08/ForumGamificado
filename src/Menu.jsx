import React, { useState } from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import avatar from "./Photos/icone.png";

function Menu() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [score, setScore] = useState(100);

  const handleSignout = () => {
    signout();
    navigate("/");
  };

  return (
    <div className="Menu">
      <div className="MenuContainer">
      <div className="AvatarContainer">
        <img className="Avatar" src={avatar} alt="Avatar" />
      </div>
      <div className="Username">@username</div>
      <div className="Score">Score: {score.toFixed(2)}</div>
      <button className="SignoutButton" onClick={handleSignout}>
        Sair
      </button>
      </div>
    </div>
  );
}

export default Menu;
