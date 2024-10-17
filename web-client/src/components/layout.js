import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MenuIcon } from "./icon-component";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 30px);
`;

const TopBar = styled.div`
  width: 100%;
  height: 30px;
  .menu-icon {
    height: 30px;
    cursor: pointer;
  }
  .menu-icon:hover {
    opacity: 0.8;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftBar = styled.div`
  width: 150px !important;
  height: auto;
  background-color: blue;
	-webkit-animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clickMenuIcon = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // FIXME: 메뉴 나타나도 canvas 크기가 고정되어 150px이 채워지지 않음.

  return (
    <Wrapper>
      <TopBar><MenuIcon onClick={clickMenuIcon}/></TopBar>
      <Content>
        { isMenuOpen ?
          <LeftBar>
            메뉴1
          </LeftBar>
          : null
        }
        <Outlet/>
      </Content>
    </Wrapper>
  )
}