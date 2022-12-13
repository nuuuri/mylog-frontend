import { Category } from "@types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryLink from "./CategoryLink";
import SubCategoryList from "./SubCategoryList";
import categoryService from "common/axios/categoryService";

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    categoryService.getCategoryList().then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  return (
    <Container className="category-list">
      {categoryList.map((category) => (
        <li key={category.id} className="category">
          <CategoryLink {...category} />

          {category.subCategories && (
            <SubCategoryList data={category.subCategories} />
          )}
        </li>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-left: 20px;
  font-family: "MonoplexKR";
  font-weight: 500;

  .category {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .selected {
    color: #333;
  }
`;
