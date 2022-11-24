import { useState } from "react";
import styled from "styled-components";
import PostCard from "./PostCard";
import Pagination from "components/Pagination";

export default function PostList(props: {
  title: String;
  posts: any[];
  limit?: number;
}) {
  const { title, posts } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const limit = props.limit ?? 5;
  const offset = limit * (currentPage - 1);

  return (
    <Container>
      <Header>
        <p className="total-posts-title">{title}</p>
        <div className="total-posts-number">{posts.length}</div>
      </Header>
      <Line />
      <Body>
        {posts.slice(offset, offset + limit).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
          <div className="empty-message">게시글이 존재하지 않습니다.</div>
        )}
      </Body>
      {posts.length > 0 && (
        <Pagination
          totalPage={Math.ceil(posts.length / limit)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
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

  .empty-message {
    color: #999;
    font-size: 15px;
  }
`;
