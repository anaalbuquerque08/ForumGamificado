import React, { useState } from "react";
import "./AppBar.css";
import { ImConnection } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaSearchPlus } from "react-icons/fa";
import { RiGroup2Fill } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import styled from "styled-components";
import { FcTabletAndroid } from "react-icons/fc";

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
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const BackdropApp = styled.div`
  
  position: fixed;
  top: 0;
  width: 2500px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ open }) => (open ? "block" : "none")};
`;

function AppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (!drawerOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  };

  return (
    <>
      <Drawer open={drawerOpen}>
        <DrawerContainer>
          <ItemDrawer>
            <span className="icone">
              <IoMdHome size={24} color=" #379164" />
            </span>
            <a>Home</a>
          </ItemDrawer>
          <ItemDrawer>
            <InclinedIcon className="icone">
              <ImConnection size={23} color=" #379164"/>
            </InclinedIcon>
            <a>Acessar o Blog</a>
          </ItemDrawer>
          <ItemDrawer>
            <span className="icone">
              <FaEnvelope size={21} color=" #379164"/>
            </span>
            <a>Realizar Contato</a>
          </ItemDrawer>
          <ItemDrawer>
            <span className="icone">
              <FaSearchPlus size={21} color=" #379164"/>
            </span>
            <a>Saiba mais</a>
          </ItemDrawer>
          <ItemDrawer>
            <span className="icone">
              <RiGroup2Fill size={24} color=" #379164"/>
            </span>
            <a>CMS</a>
          </ItemDrawer>
        </DrawerContainer>
      </Drawer>

      <AppBarContainer>
        <div className="header-section">
          <div className="logoContainer">
            <span className="logo ">
            <FcTabletAndroid size={30}/>
            </span>
          </div>
        </div>
        <div className={`links ${drawerOpen ? "open" : ""}`}>
          <a href="" target="_blank">
            TopicForum
          </a>
          <a href="" target="_blank">
          </a>
        </div>

        <div className="iconesBox">
         
          <span  className="icone"  onClick={toggleDrawer}>
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
