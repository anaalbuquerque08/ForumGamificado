import React, { useContext } from "react";
import "./Menu.css";
import { GoHeart } from "react-icons/go";
import { FaRegComment, FaTrash, FaArrowUp, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import avatar from "./Photos/icone.png";
import ScoreContext from "./ScoreContext";

function Menu() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const { score, likes, posts } = useContext(ScoreContext);

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
      <div className="scoreContainer">
        <ul className="scoreContent">
          <li className="Score">
            <FaTrophy /> Pontos: {score.toFixed(2)}
          </li>
          <li className="Score">
            <GoHeart /> Curtidas: {likes}
          </li>
          <li className="Score">
            <FaRegComment /> Posts: {posts}
          </li>
          <li className="Score">
            <FaTrophy /> Classificação: 26º lugar
          </li>
        </ul>
      </div>
      <div className="configurar">
        <span>o link para pagina de edição</span>
        <button className="SignoutButton" onClick={handleSignout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Menu;
