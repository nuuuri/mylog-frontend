import { posts } from "assets/dummy";
import PostList from "components/PostList";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category, subCategory } = useParams();

  const getCategory = () => {
    if (subCategory) return subCategory;
    else if (category) return category;
    return "";
  };

  const getPostList = () =>
    posts.filter((post) => post.category === getCategory());

  return <PostList title={getCategory()} posts={getPostList()} />;
}
