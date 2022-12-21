import { PostCards } from "@types";
import { useEffect, useState } from "react";
import postService from "common/axios/postService";
import { PostList } from "components";

export default function HomePage() {
  const [posts, setPosts] = useState<PostCards>([]);

  useEffect(() => {
    postService.getTotalPostList().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return <PostList title="전체 글" posts={posts} />;
}
