import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";

export default function EditableBlock(props: {
  id: string;
  tag: string;
  html: string;
  addBlock: Function;
}) {
  const ref = useRef<HTMLElement>(null);
  const [html, setHtml] = useState(props.html);
  const [tag, setTag] = useState(props.tag);
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);

  const onKeyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.addBlock({
        id: props.id,
        ref: ref.current,
      });
    }
  };

  return (
    <>
      {selectMenuIsOpen && <div>메뉴</div>}
      <StyledBlock
        innerRef={ref}
        html={html}
        tagName={tag}
        onChange={(e) => setHtml(e.target.value)}
        onKeyDown={onKeyDownHandler}
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
