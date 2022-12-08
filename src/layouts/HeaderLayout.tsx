import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { LayoutDefaultProps } from "@types";
import { ReactComponent as backIcon } from "assets/images/backward-arrow.svg";
import Header from "components/Header";

export default function HeaderLayout({ children }: LayoutDefaultProps) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <BackArrow onClick={() => navigate(-1)} />
      </Header>
      <Main>{children || <Outlet />}</Main>
    </>
  );
}

const BackArrow = styled(backIcon)`
  width: 25px;
  height: 25px;
  margin-left: 20px;
  cursor: pointer;
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 50px);
  background: #e9e9e9;
  overflow: auto;
`;
