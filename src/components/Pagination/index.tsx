import styled from "styled-components";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: Function;
}

export default function Pagination(props: PaginationProps) {
  const { totalPage, currentPage, setCurrentPage } = props;

  const moveFirstPage = () => {
    setCurrentPage(1);
  };

  const movePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const moveNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const moveLastPage = () => {
    setCurrentPage(totalPage);
  };

  return (
    <Container>
      <Button disabled={currentPage === 1} onClick={moveFirstPage}>
        {"<<"}
      </Button>
      <Button disabled={currentPage === 1} onClick={movePrevPage}>
        {"<"}
      </Button>
      <PageButtons>
        {Array(totalPage)
          .fill("")
          .map((_, i) => (
            <Button
              key={i}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
      </PageButtons>
      <Button disabled={currentPage === totalPage} onClick={moveNextPage}>
        {">"}
      </Button>
      <Button disabled={currentPage === totalPage} onClick={moveLastPage}>
        {">>"}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button<{ active?: boolean }>`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: ${(props) => (props.active ? "lightblue" : "none")};
  color: ${(props) =>
    props.disabled ? "#ccc" : props.active ? "#fff" : "#000"};
  font-family: "MonoplexKR";
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
`;
const PageButtons = styled.div`
  margin: 0 15px;
`;
