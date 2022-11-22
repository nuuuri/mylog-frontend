import { ReactComponent as menuIcon } from "assets/images/menu-icon.svg";
import styled from "styled-components";

export default function DefaultHeader() {
  return (
    <Container>
      <MenuIcon />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  background: #d5eff8;
`;
const MenuIcon = styled(menuIcon)`
  margin-left: 20px;
  filter: invert(1);
  cursor: pointer;
`;
