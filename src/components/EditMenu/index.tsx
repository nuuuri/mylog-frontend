import styled from "styled-components";
import Duck from "assets/images/오리.jpg";

interface ItemProps {
  image: string;
  title: string;
  description: string;
}

const MENU_LIST: ItemProps[] = [
  {
    image: Duck,
    title: "menu1",
    description: "menu에 대한 설명입니다. menu에 대한 설명입니다.",
  },
  {
    image: Duck,
    title: "menu2",
    description: "menu에 대한 설명입니다. menu에 대한 설명입니다.",
  },
  {
    image: Duck,
    title: "menu3",
    description: "menu에 대한 설명입니다. menu에 대한 설명입니다.",
  },
];

export default function EditMenu(props: {
  position: { x: number; y: number };
}) {
  return (
    <Menu position={props.position}>
      <div className="menu-item-title">기본 블럭</div>
      {MENU_LIST.map((menu, idx) => (
        <EditMenu.Item key={idx} {...menu} />
      ))}
    </Menu>
  );
}

EditMenu.Item = function EditMenuItem({
  image,
  title,
  description,
}: ItemProps) {
  return (
    <Item>
      <img className="menu-image" src={image} alt={`${title} icon`} />
      <div className="menu-text">
        <div className="menu-title">{title}</div>
        <div className="menu-description">{description}</div>
      </div>
    </Item>
  );
};

const Menu = styled.div<{ position: { x: number; y: number } }>`
  position: fixed;
  top: ${(props) => props.position.y + 3 + "px"};
  left: ${(props) => props.position.x + "px"};
  width: 250px;
  padding: 5px;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  z-index: 1;
  cursor: default;

  .menu-item-title {
    margin: 5px 0 5px 10px;
    font-size: 11px;
    color: #666;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;

  :hover {
    background: #e9e9e9;
  }

  .menu-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 4px;
  }
  .menu-text {
    overflow: hidden;
    cursor: pointer;
  }
  .menu-title {
    margin-bottom: 2px;
    font-size: 14px;
  }
  .menu-description {
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
