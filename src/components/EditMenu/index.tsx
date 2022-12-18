import styled from "styled-components";

export default function EditMenu(props: {
  position: { x: number; y: number };
}) {
  return (
    <Menu position={props.position}>
      <div>menu 1</div>
      <div>menu 2</div>
      <div>menu 3</div>
    </Menu>
  );
}

const Menu = styled.div<{ position: { x: number; y: number } }>`
  position: fixed;
  top: ${(props) => props.position.y + 3 + "px"};
  left: ${(props) => props.position.x + "px"};
  width: 150px;
  height: 100px;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  z-index: 1;
`;
