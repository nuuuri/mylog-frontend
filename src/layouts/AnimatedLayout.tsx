import styled from "styled-components";
import { useState } from "react";
import { Outlet } from "react-router";
import { LayoutDefaultProps } from "@types";
import Header from "components/header";
import GlobalNavigationBar from "components/gnb";

export default function AnimatedLayout({ children }: LayoutDefaultProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <Header onClickMenu={() => setIsFullScreen((state) => !state)} />
      <Main>
        <AnimatedGnb isFullScreen={isFullScreen}>
          <GlobalNavigationBar />
        </AnimatedGnb>
        <Page isFullScreen={isFullScreen}>{children || <Outlet />}</Page>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  height: calc(100vh - 50px);
`;
const Page = styled.div<{ isFullScreen: boolean }>`
  position: absolute;
  box-sizing: border-box;
  max-width: 100vw;
  max-height: calc(100vh - 50px);
  padding: 50px;
  overflow: auto;
  animation: ${(props) =>
    props.isFullScreen ? "gnbClose 0.3s" : "gnbOpen 0.3s"};
  animation-fill-mode: both;

  @keyframes gnbOpen {
    from {
      width: 100vw;
      left: 0;
    }
    to {
      width: calc(100vw - 250px);
      left: 250px;
    }
  }
  @keyframes gnbClose {
    from {
      width: calc(100vw - 250px);
      left: 250px;
    }
    to {
      width: 100vw;
      left: 0;
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
