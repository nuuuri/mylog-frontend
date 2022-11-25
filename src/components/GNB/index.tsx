import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CategoryList from "./CategoryList";

// GlobalNavigationBar
export default function GNB() {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Container>
      <GNB.Menu href="/" text="HOME" />
      <GNB.Menu
        href="/"
        text="CATEGORIES"
        onClick={() => setCategoryOpen(!categoryOpen)}
      />
      {categoryOpen && <CategoryList />}
      <GNB.Menu href="/" text="TAGS" />
      <GNB.Menu href="/" text="ABOUT" />
      <PostingButton onClick={() => navigate("/postwrite")}>
        글쓰기
      </PostingButton>
    </Container>
  );
}

GNB.Menu = function NavigationMenu(props: {
  href: string;
  text: string;
  onClick?: Function;
}) {
  const navigate = useNavigate();

  const onClickMenu = () => {
    if (props.onClick) props.onClick();
    else navigate(props.href);
  };

  return <Menu onClick={onClickMenu}>{props.text}</Menu>;
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
  width: fit-content;
  margin: 10px 0;
  font-weight: 600;
  font-size: 15px;
  color: #444;
  cursor: pointer;
`;
const PostingButton = styled.button`
  position: absolute;
  bottom: 30px;
  width: calc(100% - 60px);
  height: 35px;
  cursor: pointer;
`;
