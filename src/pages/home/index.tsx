import { posts } from "assets/dummy";
import styled from "styled-components";

export default function HomePage() {
  const totalPosts = posts;

  return (
    <Container>
      <Header>
        <p className="total-posts-title">전체 글</p>
        <div className="total-posts-number">{totalPosts.length}</div>
      </Header>
      <Line />
      <Body>
        {totalPosts.map((post) => (
          <div key={post.id}>
            <div>{post.title}</div>
          </div>
        ))}
      </Body>
    </Container>
  );
}

const Container = styled.div`
  font-family: "MonoplexKR-Regular";
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: default;

  .total-posts-title {
    font-size: 20px;
    font-weight: 300;
  }
  .total-posts-number {
    width: fit-content;
    height: fit-content;
    margin-left: 10px;
    padding: 1px 8px;
    border-radius: 6px;
    background: #add8e6;
    color: #ffffff;
    font-weight: 600;
    font-size: 13px;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #e2e2e2;
`;
const Body = styled.div`
  margin-top: 25px;
`;
