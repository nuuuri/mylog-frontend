import styled from "styled-components";
import { posts } from "assets/dummy";
import PostCard from "components/PostCard";
import Pagination from "components/Pagination";
import { useState } from "react";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = limit * (currentPage - 1);
  const totalPosts = posts;

  return (
    <Container>
      <Header>
        <p className="total-posts-title">전체 글</p>
        <div className="total-posts-number">{totalPosts.length}</div>
      </Header>
      <Line />
      <Body>
        {totalPosts.slice(offset, offset + limit).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Body>
      <Pagination
        totalPage={Math.ceil(totalPosts.length / limit)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}

const Container = styled.div`
  font-family: "MonoplexKR";
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: default;

  .total-posts-title {
    font-size: 17px;
    font-weight: 400;
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
  margin: 25px 0 50px 0;
`;
