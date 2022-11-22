import { Outlet } from "react-router";
import styled from "styled-components";
import GlobalNavigationBar from "components/gnb";
import DefaultHeader from "components/header";

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

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
