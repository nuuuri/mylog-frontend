import styled from "styled-components";
import Duck from "assets/images/오리.jpg";
import { useEffect, useRef, useState } from "react";

interface MENU {
  image: string;
  title: string;
  description: string;
}

interface ItemProps extends MENU {
  setFocused: any;
  setFocusedMenu: any;
}

const MENU_LIST: MENU[] = [
  {
    image: Duck,
    title: "menu1",
    description: "menu1에 대한 설명입니다. menu1에 대한 설명입니다.",
  },
  {
    image: Duck,
    title: "menu2",
    description: "menu2에 대한 설명입니다. menu2에 대한 설명입니다.",
  },
  {
    image: Duck,
    title: "menu3",
    description: "menu3에 대한 설명입니다. menu3에 대한 설명입니다.",
  },
];

export default function EditMenu(props: {
  position: { x: number; y: number };
}) {
  const [focused, setFocused] = useState(false);
  const [focusedMenu, setFocusedMenu] = useState({
    image: "",
    text: "",
  });

  return (
    <>
      <Menu position={props.position}>
        <div className="menu-item-title">기본 블럭</div>
        {MENU_LIST.map((menu, idx) => (
          <EditMenu.Item
            key={idx}
            {...menu}
            setFocused={setFocused}
            setFocusedMenu={setFocusedMenu}
          />
        ))}
      </Menu>
      {focused && (
        <EditMenu.ItemDetail
          position={{ x: props.position.x + 260, y: props.position.y }}
          text={focusedMenu.text}
        />
      )}
    </>
  );
}

EditMenu.Item = function EditMenuItem({
  image,
  title,
  description,
  setFocused,
  setFocusedMenu,
}: ItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    element.addEventListener("mouseover", () => {
      setFocused(true);
      setFocusedMenu({ image: image, text: description });
    });
    element.addEventListener("mouseleave", () => {
      setFocused(false);
    });
  }, [image, description, setFocused, setFocusedMenu]);

  return (
    <Item ref={ref}>
      <img className="menu-image" src={image} alt={`${title} icon`} />
      <div className="menu-text">
        <div className="menu-title">{title}</div>
        <div className="menu-description">{description}</div>
      </div>
    </Item>
  );
};

EditMenu.ItemDetail = function EditMenuItemDetail(props: {
  position: { x: number; y: number };
  text: string;
}) {
  return <ItemDetail position={props.position}>{props.text}</ItemDetail>;
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
const ItemDetail = styled.div<{ position: { x: number; y: number } }>`
  position: fixed;
  top: ${(props) => props.position.y + 3 + "px"};
  left: ${(props) => props.position.x + "px"};
  width: 100px;
  height: 130px;
  padding: 10px;
  border-radius: 4px;
  background: #000;
  color: #fff;
  font-size: 13px;
`;
