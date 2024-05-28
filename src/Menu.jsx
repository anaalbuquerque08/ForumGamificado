import React, { useState } from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { FaTrophy } from "react-icons/fa";
import avatar from "./Photos/icone.png";
 
function Menu() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [score, setScore] = useState(100);

  const handleSignout = () => {
    signout();
    navigate("/");
  };

  return (
      <div className="MenuContainer">
        <div className="AvatarContainer">
          <img className="Avatar" src={avatar} alt="Avatar" />
        </div>
        <div className="UserDetails">
          <h4 className="NameMenu">{user?.nome}</h4>
          <div className="usernameMenu">@{user?.username}</div>
        </div>
        <div className="Score"><FaTrophy /> Score: {score.toFixed(2)}</div>

        <div>
          <span>o link para pagina de edição</span>
        </div>
        <button className="SignoutButton" onClick={handleSignout}>
          Sair
        </button>
      </div>
  );
}

export default Menu;
