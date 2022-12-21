import styled from "styled-components";
import { useState } from "react";
import { Outlet } from "react-router";
import { LayoutDefaultProps } from "@types";
import { ReactComponent as menuIcon } from "assets/images/menu-icon.svg";
import { Header, GNB } from "components";

export default function AnimatedMenuLayout({ children }: LayoutDefaultProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <Header>
        <MenuIcon onClick={() => setIsFullScreen((state) => !state)} />
      </Header>
      <Main>
        <AnimatedGnb isFullScreen={isFullScreen}>
          <GNB />
        </AnimatedGnb>
        <Page isFullScreen={isFullScreen}>{children || <Outlet />}</Page>
      </Main>
    </>
  );
}
const MenuIcon = styled(menuIcon)`
  margin-left: 20px;
  filter: invert(1);
  cursor: pointer;
`;
const Main = styled.main`
  display: flex;
  height: calc(100vh - 50px);
`;
const Page = styled.div<{ isFullScreen: boolean }>`
  position: absolute;
  box-sizing: border-box;
  max-width: 100vw;
  max-height: calc(100vh - 50px);
  overflow-x: hidden;
  overflow-y: auto;
  animation: ${(props) =>
    props.isFullScreen ? "gnbClose 0.3s" : "gnbOpen 0.3s"};
  animation-fill-mode: both;

  @keyframes gnbOpen {
    from {
      width: 100vw;
      left: 0;
      padding: 50px 300px;
    }
    to {
      width: calc(100vw - 250px);
      left: 250px;
      padding: 50px 150px;
    }
  }
  @keyframes gnbClose {
    from {
      width: calc(100vw - 250px);
      left: 250px;
      padding: 50px 150px;
    }
    to {
      width: 100vw;
      left: 0;
      padding: 50px 300px;
    }
  }
`;
const AnimatedGnb = styled.div<{ isFullScreen: boolean }>`
  position: absolute;
  animation: ${(props) =>
    props.isFullScreen ? "slideOut 0.3s" : "slideIn 0.3s"};
  animation-fill-mode: both;

  @keyframes slideIn {
    from {
      left: -250px;
    }
    to {
      left: 0;
    }
  }
  @keyframes slideOut {
    from {
      left: 0;
    }
    to {
      left: -250px;
    }
  }
`;
