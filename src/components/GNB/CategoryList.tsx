import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import categoryService from "common/axios/categoryService";

interface CategoryType {
  id: number;
  name: string;
  label: string;
  count: number;
  subCategories?: CategoryType[];
}

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  useEffect(() => {
    categoryService.getCategoryList().then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  return (
    <Container className="category-list">
      {categoryList.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </Container>
  );
}

const Category = (props: { category: CategoryType }) => {
  const { name, label, count, subCategories } = props.category;

  return (
    <li className="category">
      <Category.Item name={name} label={label} count={count} />

      <ul className="sub-category-list">
        {subCategories?.map((subCategory) => (
          <li key={subCategory.id} className="sub-category">
            <Category.Item
              name={subCategory.name}
              label={subCategory.label}
              count={subCategory.count}
            />
          </li>
        ))}
      </ul>
    </li>
  );
};

Category.Item = function CategoryItem(props: {
  name: string;
  label: string;
  count: number;
}) {
  const location = useLocation();
  const selected = props.name === location.pathname.split("/").pop();

  return (
    <StyledLink
      className={selected ? "selected" : ""}
      to={`category/${props.label}`}
    >
      {` ${props.name} `}
      <span className="category-cnt">{`(${props.count})`}</span>
    </StyledLink>
  );
};

const Container = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-left: 20px;
  font-family: "MonoplexKR";
  font-weight: 500;

  .category {
    margin-bottom: 10px;
    font-size: 15px;
  }

  .sub-category-list {
    list-style-type: none;
    margin-top: 5px;
  }

  .sub-category {
    position: relative;
    margin-bottom: 5px;
    font-size: 14px;

    a {
      text-decoration: none;
    }

    ::before {
      content: "";
      position: absolute;
      top: 10px;
      left: -13px;
      width: 7px;
      height: 1px;
      background: #999;
    }
  }

  .category-cnt {
    font-size: 12px;
  }

  .selected {
    color: #333;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #999;

  :hover {
    text-decoration: underline;
    color: #333 !important;
    font-weight: 600;
  }
`;
