import { PostCardItem } from "@types";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function PostCard(props: { post: PostCardItem }) {
  const { post } = props;
  const navigate = useNavigate();

  return (
    <Container>
      <Post onClick={() => navigate(`/post/${post.id}`)}>
        <div className="post-title">{post.title}</div>
        <div className="post-content">{post.preview}</div>
        <PostMeta>
          <div
            className="post-category"
            onClick={() => navigate(`/category/${post.category}`)}
          >
            {post.category.split("/").pop()}
          </div>
          <div className="post-date">
            {moment(post.modified).format("YY/MM/DD HH:mm")}
          </div>
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
  height: 100px;
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
    cursor: pointer;
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
