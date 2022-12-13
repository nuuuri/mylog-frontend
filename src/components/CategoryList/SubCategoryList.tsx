import { Category } from "@types";
import styled from "styled-components";
import CategoryLink from "./CategoryLink";

export default function SubCategoryList(props: { data: Category[] }) {
  const { data } = props;

  return (
    <Container>
      {data.map((category) => (
        <li key={category.id} className="sub-category">
          <CategoryLink {...category} />
        </li>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  list-style-type: none;
  margin-top: 5px;

  .sub-category {
    position: relative;
    margin-bottom: 5px;
    font-size: 15px;

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
`;
