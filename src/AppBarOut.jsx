import React from "react";
import styled from "styled-components";
import { FcTabletAndroid } from "react-icons/fc";

const AppBarContainer = styled.div`
  width: 100vw;
  min-height: 64px;
  background-color: #ffffff;
  color: rgb(255, 153, 102);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: start; 
  position: fixed;
  top: 0;
  padding: 0px 24px;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex; 
  align-items: center; 
`;

const Logo = styled.span`
  font-size: 30px;
`;

const AppBarOut = () => {
  return (
    <AppBarContainer>
      <LogoContainer>
        <Logo>
          <FcTabletAndroid size={30} />
        </Logo>
        <div className="links">
        <a href="" target="_blank">
          TopicForum
        </a>
      </div>

      </LogoContainer>
     
    </AppBarContainer>
  );
};

export default AppBarOut;
