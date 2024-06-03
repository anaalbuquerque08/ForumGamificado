import React, { useState, useContext } from "react";
import "./AppBar.css";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import styled from "styled-components";
import { FcTabletAndroid } from "react-icons/fc";
import avatar from "./Photos/icone.png";
import { AuthContext } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

import { FaRegComment, FaTrash, FaArrowUp, FaTrophy } from "react-icons/fa";

const InclinedIcon = styled.span`
  transform: rotate(45deg);
`;

const AppBarContainer = styled.div`
  width: 100vw;
  min-height: 64px;
  background-color: #ffffff;
  color: rgb(255, 153, 102);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  padding: 0px 24px;
  z-index: 1000;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? "0" : "-250px")};
  width: 250px;
  height: 100vh;
  background-color: white;
  color: black;
  transition: right 0.3s ease;
  z-index: 1010;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const DrawerContainer = styled.div`
  font-size: 14px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  padding: 12px;
`;

const ItemDrawer = styled.div`
  display: flex;
  padding: 10px 16px;
`;

const Backdrop = styled.div`
  position: fixed;
  width: 100vw;
  top: 0px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const BackdropApp = styled.div`
  position: fixed;
`;

function AppBar({ onMenuClick, onHomeClick, onSearchClick, onProfileEditClick }) {
  const { user } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { signout } = useAuth();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (!drawerOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  };

  const handleSignout = () => {
    signout();
    navigate("/");
  };

  return (
    <>
      <Drawer open={drawerOpen}>
        <ItemDrawer onClick={onHomeClick}>
          <div className="AvatarContainerApp">
            <img className="AvatarApp" src={avatar} alt="Avatar" />
          </div>
        </ItemDrawer>
        <div className="NameContainer" onClick={onHomeClick}>
            <h4 className="NameMenuApp">{user?.nome}</h4>
            <div className="usernameMenuApp">@{user?.username}</div>
        </div>
        <DrawerContainer>
          <ItemDrawer onClick={onHomeClick}>
            <span className="icone">
              <IoMdHome size={24} color=" #379164" />
            </span>
            <a>Home</a>
          </ItemDrawer>


          <ItemDrawer onClick={onMenuClick}>
            <span className="icone">
              <FaTrophy size={24} color=" #379164" />
            </span>
            <a>Pontuação</a>
          </ItemDrawer>


          <ItemDrawer onClick={onSearchClick}>
            <span className="icone">
              <IoMdSearch size={24} color=" #379164" />
            </span>
            <a>SearchAndAdd</a>
          </ItemDrawer>

          <ItemDrawer onClick={handleSignout}>
            <span className="icone">
              <MdOutlineLogout size={24} color=" #379164" />
            </span>
            <a>Sair</a>
          </ItemDrawer>
        </DrawerContainer>
      </Drawer>

      <AppBarContainer>
        <div className="header-section">
          <div className="logoContainer">
            <span className="logo ">
              <FcTabletAndroid size={30} />
            </span>
          </div>
        </div>
        <div className={`links ${drawerOpen ? "open" : ""}`}>
          <a href="" target="_blank">
            TopicForum
          </a>
          <a href="" target="_blank"></a>
        </div>

        <div className="iconesBox">
          <span className="icone" onClick={toggleDrawer}>
            <MdOutlineMenu size={24} color=" #379164" />
          </span>
          <BackdropApp open={drawerOpen} onClick={toggleDrawer} />
        </div>
      </AppBarContainer>
      <Backdrop open={drawerOpen} onClick={toggleDrawer} />
    </>
  );
}

export default AppBar;
