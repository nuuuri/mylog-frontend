import { posts } from "assets/dummy";
import PostList from "components/PostList";

export default function HomePage() {
  const totalPosts = posts;

  return <PostList title="전체 글" posts={totalPosts} />;
}
