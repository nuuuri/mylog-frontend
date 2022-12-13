import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CategoryLink(props: {
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
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #999;

  :hover {
    text-decoration: underline;
    color: #333 !important;
    font-weight: 600;
  }

  .category-cnt {
    font-size: 12px;
  }
`;
