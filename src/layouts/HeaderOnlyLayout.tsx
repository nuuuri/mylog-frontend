import { LayoutDefaultProps } from "@types";
import Header from "components/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function HeaderOnlyLayout({ children }: LayoutDefaultProps) {
  return (
    <>
      <Header type="BACK" />
      <Main>{children || <Outlet />}</Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 50px);
  background: #e9e9e9;
  overflow: auto;
`;
