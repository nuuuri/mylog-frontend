import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function GlobalNavigationBar() {
  return (
    <Container>
      <GlobalNavigationBar.Menu href="/" text="홈" />
      <GlobalNavigationBar.Menu href="/post" text="게시판" />
      <GlobalNavigationBar.Menu href="/" text="페이지" />
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
  align-items: center;
  width: 250px;
  height: calc(100vh - 50px);
  padding-top: 10px;
  background: #f1f1f1;
`;
const Menu = styled.div`
  margin: 5px 0;
  font-weight: 600;
  font-size: 15px;
  color: #444;
  cursor: pointer;
`;
