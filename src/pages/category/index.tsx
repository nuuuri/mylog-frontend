import { PostCards } from "@types";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "common/axios/postService";
import PostList from "components/PostList";

export default function CategoryPage() {
  const { category, subCategory } = useParams();
  const [posts, setPosts] = useState<PostCards>([]);

  const getCategory = useCallback(() => {
    if (subCategory) return subCategory;
    else if (category) return category;
    return "";
  }, [category, subCategory]);

  useEffect(() => {
    postService.getPostListByCategory(getCategory()).then((res) => {
      setPosts(res.data);
    });
  }, [getCategory]);

  return <PostList title={getCategory()} posts={posts} />;
}
