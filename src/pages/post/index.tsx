import styled from "styled-components";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostStore from "common/store/PostStore";

export default observer(function PostPage() {
  const { id } = useParams();
  const { post } = PostStore;

  const htmlToPlainText = (html: string) => {
    return html.replace(/&lt;/, "<").replace(/&gt;/gi, ">");
  };

  useEffect(() => {
    if (id) {
      PostStore.fetchPost(parseInt(id));
    }
  }, [id]);

  return (
    <Container>
      <h1>{post.title}</h1>
      {post.blocks.map((block) => (
        <Block
          key={block.id}
          dangerouslySetInnerHTML={{ __html: htmlToPlainText(block.html) }}
        />
      ))}
    </Container>
  );
});

const Container = styled.div`
  cursor: default;
`;
const Block = styled.pre`
  font-family: "sans-serif";
  line-height: 25px;
`;
