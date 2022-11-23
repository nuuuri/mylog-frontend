import styled from "styled-components";
import { Outlet } from "react-router";
import { LayoutDefaultProps } from "@types";
import Header from "components/Header";
import GNB from "components/GNB";

export default function DefaultLayout({ children }: LayoutDefaultProps) {
  return (
    <>
      <Header />
      <Main>
        <GNB />
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
