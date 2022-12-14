import { useBoolean } from "common/utils/useBoolean";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Option {
  text: string;
  value: any;
}
interface Props {
  label?: string;
  placeholder?: string;
  onChange: any;
  options: Option[];
}

export default function Select({ label, onChange, options, ...props }: Props) {
  const placeholder = props.placeholder ?? "Select...";
  const [selected, select] = useState<Option>({
    text: placeholder,
    value: null,
  });
  const { value: isMenuOpen, toggle: toggleMenu } = useBoolean(false);

  useEffect(() => {
    onChange(selected.value);
  }, [selected, onChange]);

  return (
    <SelectBox onClick={toggleMenu}>
      {label && <Label>{label}</Label>}
      <Selected selected={placeholder !== selected.text}>
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

const SelectBox = styled.div`
  position: relative;
  width: 140px;
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
  height: 50px;
  line-height: 30px;
  padding: 10px 30px 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.selected ? "#333" : "#999")};
  font-size: 16px;
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
