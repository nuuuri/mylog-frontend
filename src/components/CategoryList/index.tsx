import styled from "styled-components";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CategoryLink from "./CategoryLink";
import SubCategoryList from "./SubCategoryList";
import CategoryStore from "common/store/CategoryStore";

export default observer(function CategoryList() {
  const { categories } = CategoryStore;

  useEffect(() => {
    CategoryStore.fetchCategories();
  }, []);

  return (
    <Container className="category-list">
      {categories.map((category) => (
        <li key={category.id} className="category">
          <CategoryLink {...category} />

          {category.subCategories && (
            <SubCategoryList data={category.subCategories} />
          )}
        </li>
      ))}
    </Container>
  );
});

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
