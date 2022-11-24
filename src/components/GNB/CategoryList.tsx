import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface CategoryType {
  id: number;
  category: string;
  subCategory?: CategoryType[];
}

const dummyCategory: CategoryType[] = [
  {
    id: 1,
    category: "Frontend",
    subCategory: [
      { id: 2, category: "React" },
      { id: 3, category: "NextJS" },
    ],
  },
  {
    id: 4,
    category: "Backend",
    subCategory: [
      { id: 5, category: "Spring" },
      { id: 6, category: "Java" },
    ],
  },
];

export default function CategoryList() {
  return (
    <Container>
      {dummyCategory.map((category) => (
        <CategoryList.Category key={category.id} category={category} />
      ))}
    </Container>
  );
}

CategoryList.Category = function CategoryComp(props: {
  category: CategoryType;
}) {
  const { category, subCategory } = props.category;
  const navigate = useNavigate();

  return (
    <>
      <div
        className="category"
        onClick={() => navigate(`/category/${category}`)}
      >
        {category}
      </div>
      {subCategory?.map((sub) => (
        <CategoryList.SubCategory
          key={sub.id}
          category={sub}
          onClick={() => navigate(`/category/${category}/${sub.category}`)}
        />
      ))}
    </>
  );
};

CategoryList.SubCategory = function SubCategoryComp(props: {
  category: CategoryType;
  onClick: MouseEventHandler;
}) {
  const { category } = props.category;

  return (
    <div className="sub_category" onClick={props.onClick}>
      {category}
    </div>
  );
};

const Container = styled.div`
  color: #999;
  cursor: pointer;

  .category {
    margin: 25px 0 0 20px;
    font-size: 15px;

    :first-child {
      margin-top: 0;
    }
  }

  .sub_category {
    position: relative;
    margin: 3px 0 3px 60px;
    font-size: 14px;

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
`;
