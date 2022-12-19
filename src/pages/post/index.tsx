import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostDetail } from "@types";
import postService from "common/axios/postService";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<PostDetail>({
    id: 0,
    userId: "",
    category: "",
    title: "",
    blocks: [],
  });

  const htmlToPlainText = (html: string) => {
    return html.replace(/&lt;/, "<").replace(/&gt;/gi, ">");
  };

  useEffect(() => {
    if (!id) return;

    postService.getPost(parseInt(id)).then((res) => {
      setPost(res.data);
    });
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
}

const Container = styled.div`
  cursor: default;
`;
const Block = styled.pre`
  font-family: "sans-serif";
  line-height: 25px;
  overflow: auto;
  white-space: pre-wrap;
`;
