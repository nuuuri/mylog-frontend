import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LayoutDefaultProps } from "@types";

export default function Header({ children }: LayoutDefaultProps) {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>MyLog</Logo>
      {children}
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  background: #add8e6;
`;
const Logo = styled.div`
  position: absolute;
  left: 50%;
  font-family: "SDSamliphopangche_Outline";
  font-size: 23px;
  color: #fff;
  cursor: pointer;
`;
