import { useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";

export default function EditableBlock(props: { tag: string; html: string }) {
  const [html, setHtml] = useState(props.html);
  const [tag, setTag] = useState(props.tag);
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);

  return (
    <>
      {selectMenuIsOpen && <div>메뉴</div>}
      <StyledBlock
        html={html}
        tagName={tag}
        onChange={(e) => setHtml(e.target.value)}
      />
    </>
  );
}

const StyledBlock = styled(ContentEditable)`
  background: #f3f3f3;
  outline: none;

  /*  ::after {
    content: attr(placeholder);
  } */
`;
