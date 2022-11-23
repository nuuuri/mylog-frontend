import { ReactComponent as menuIcon } from "assets/images/menu-icon.svg";
import styled from "styled-components";

export default function Header(props: { onClickMenu?: Function }) {
  const onClickMenuIcon = () => {
    if (props.onClickMenu) {
      props.onClickMenu();
    }
  };

  return (
    <Container>
      <MenuIcon onClick={onClickMenuIcon} />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  background: #add8e6;
`;
const MenuIcon = styled(menuIcon)`
  margin-left: 20px;
  filter: invert(1);
  cursor: pointer;
`;
