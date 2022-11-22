import styled from "styled-components";
import { Outlet } from "react-router";
import { LayoutDefaultProps } from "@types";
import DefaultHeader from "components/header";
import GlobalNavigationBar from "components/gnb";

export default function DefaultLayout({ children }: LayoutDefaultProps) {
  return (
    <>
      <DefaultHeader />
      <Main>
        <GlobalNavigationBar />
        <Page>{children || <Outlet />}</Page>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  height: calc(100vh - 50px);
`;
const Page = styled.div`
  width: calc(100vw - 150px);
  overflow: auto;
`;
