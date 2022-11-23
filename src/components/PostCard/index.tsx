import styled from "styled-components";

/*
const dummy = {
    id: 1,
    writer: 1, // user_uuid
    category: "test",
    title: "첫번째 게시물입니다.",
    content: "test test test",
    created: "2022-11-23 12:17",
    modified: "2022-11-23 12:38",
    tags: ["test", "테스트"],
  };
*/

export default function PostCard(props: { post: any }) {
  const { post } = props;

  return (
    <Container>
      <Post>
        <div className="post-title">{post.title}</div>
        <div className="post-content">{post.content}</div>
        <PostMeta>
          <div className="post-category">{post.category}</div>
          <div className="post-date">{post.created}</div>
        </PostMeta>
        {/*   <Tags>
          {post.tags.map((tag: string, idx: number) => (
            <div key={idx} className="post-tag">
              {tag}
            </div>
          ))}
        </Tags> */}
      </Post>
      {post.thumbnail && <Thumbnail />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  break-inside: avoid-column;
`;
const Post = styled.div`
  .post-title,
  .post-content {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }
  .post-title {
    font-size: 15px;
    font-weight: 500;
  }
  .post-content {
    margin: 10px 0;
    color: #999;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
  }
`;
const PostMeta = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;

  .post-category {
    cursor: pointer;
  }
  .post-date {
    position: relative;
    margin-left: 20px;
    color: #999;

    ::before {
      content: "";
      position: absolute;
      top: 9px;
      left: -10px;
      width: 2px;
      height: 2px;
      background: #999;
      border-radius: 2px;
    }
  }
`;
const Thumbnail = styled.div`
  min-width: 150px;
  height: 100px;
  margin-left: 10px;
  background: lightgrey;
`;
/* const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;

  .post-tag {
    width: fit-content;
    height: fit-content;
    font-size: 12px;
    background: lightblue;
  }
`;
 */
