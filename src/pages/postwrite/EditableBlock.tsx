import { useRefCallback } from "common/utils/useRefCallback";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";

export default function EditableBlock(props: {
  id: string;
  tag: string;
  html: string;
  addBlock: Function;
  deleteBlock: Function;
}) {
  const ref = useRef<HTMLElement>(null);
  const [html, setHtml] = useState(props.html);
  const [tag, setTag] = useState(props.tag);
  const [previousKey, setPreviousKey] = useState("");
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);

  const onKeyDownHandler = useRefCallback(
    (e: any) => {
      if (e.key === "Enter" && previousKey !== "Shift") {
        e.preventDefault();
        props.addBlock({
          id: props.id,
          ref: ref.current,
        });
      }

      if (e.key === "Backspace" && html === "") {
        e.preventDefault();
        props.deleteBlock({ id: props.id, ref: ref.current });
      }

      setPreviousKey(e.key);
    },
    [previousKey, html]
  );

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
