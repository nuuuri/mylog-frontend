import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function GlobalNavigationBar() {
  return (
    <Container>
      <GlobalNavigationBar.Menu href="/" text="HOME" />
      <GlobalNavigationBar.Menu href="/" text="CATEGORIES" />
      <GlobalNavigationBar.Menu href="/" text="TAGS" />
      <GlobalNavigationBar.Menu href="/" text="ABOUT" />
    </Container>
  );
}

GlobalNavigationBar.Menu = function NavigationMenu(props: {
  href: string;
  text: string;
}) {
  const navigate = useNavigate();

  return <Menu onClick={() => navigate(props.href)}>{props.text}</Menu>;
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: calc(100vh - 50px);
  padding-top: 30px;
  padding-left: 30px;
  background: #f1f1f1;
  font-family: "NanumSquareRound";
`;
const Menu = styled.div`
  margin: 5px 0;
  font-weight: 600;
  font-size: 15px;
  color: #444;
  cursor: pointer;
`;
