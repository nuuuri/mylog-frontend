import { SelectOption } from "@types";
import { useBoolean } from "common/utils/useBoolean";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  label?: string;
  placeholder?: string;
  onChange: any;
  options: SelectOption[];
  style?: {
    width?: number;
    height?: number;
    margin?: string;
  };
}

export default function Select({
  label,
  placeholder,
  onChange,
  options,
  style,
}: Props) {
  const [selected, select] = useState<SelectOption>({
    text: placeholder ?? "Select...",
    value: null,
  });
  const { value: isMenuOpen, toggle: toggleMenu } = useBoolean(false);

  useEffect(() => {
    onChange(selected.value);
  }, [selected, onChange]);

  return (
    <SelectBox onClick={toggleMenu} selectStyle={style}>
      {label && <Label>{label}</Label>}
      <Selected className="select" selected={!!selected.value}>
        {selected.text}
      </Selected>
      {isMenuOpen && (
        <Menu>
          {options.map((option, idx) => (
            <Item key={idx} onClick={() => select(option)}>
              {option.text}
            </Item>
          ))}
        </Menu>
      )}
    </SelectBox>
  );
}

const SelectBox = styled.div<{ selectStyle: any }>`
  position: relative;
  width: ${(props) =>
    props.selectStyle?.width ? `${props.selectStyle?.width}px` : "140px"};
  height: ${(props) =>
    props.selectStyle?.height ? `${props.selectStyle?.height}px` : "50px"};
  margin: ${(props) => props.selectStyle?.margin};

  & > .select {
    line-height: ${(props) =>
      props.selectStyle?.height
        ? `${props.selectStyle?.height - 20}px`
        : "30px"};
  }
`;
const Label = styled.div`
  position: absolute;
  top: -8px;
  left: 10px;
  background: #fff;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  z-index: 1;
`;
const Selected = styled.div<{ selected: boolean }>`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 30px 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.selected ? "#333" : "#999")};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  ::before {
    position: absolute;
    right: 10px;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f0d7";
    color: #ccc;
  }
`;
const Menu = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  margin-top: 5px;
  padding: 10px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
`;
const Item = styled.div`
  padding: 5px 15px;
  color: #666;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  :hover {
    background: #e9e9e9;
  }
`;
