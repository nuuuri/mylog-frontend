import { ReactComponent as menuIcon } from "assets/images/menu-icon.svg";
import { ReactComponent as backIcon } from "assets/images/backward-arrow.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header(props: {
  type: "MENU" | "BACK";
  onClickMenu?: Function;
}) {
  const navigate = useNavigate();

  const onClickMenuIcon = () => {
    if (props.onClickMenu) {
      props.onClickMenu();
    }
  };

  return (
    <Container>
      {props.type === "MENU" && <MenuIcon onClick={onClickMenuIcon} />}
      {props.type === "BACK" && <BackArrow onClick={() => navigate(-1)} />}
      <Logo onClick={() => navigate("/")}>MyLog</Logo>
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
const BackArrow = styled(backIcon)`
  width: 25px;
  height: 25px;
  margin-left: 20px;
  cursor: pointer;
`;
const Logo = styled.div`
  position: absolute;
  left: 50%;
  font-family: "SDSamliphopangche_Outline";
  font-size: 23px;
  color: #fff;
  cursor: pointer;
`;
