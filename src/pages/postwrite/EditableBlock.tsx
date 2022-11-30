import { useRefCallback } from "common/utils/useRefCallback";
import { memo, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";

export default memo(function EditableBlock(props: {
  id: string;
  tag: string;
  html: string;
  updatePage: Function;
  addBlock: Function;
  deleteBlock: Function;
}) {
  const ref = useRef<HTMLElement>(null);
  const [html, setHtml] = useState(props.html);
  const [tag, setTag] = useState(props.tag);
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);

  const onChangeHandler = (e: any) => {
    setHtml(e.target.value === "<br>" ? "" : e.target.value);
  };

  const onKeyDownHandler = useRefCallback(
    (e: any) => {
      if (e.key === "Enter" && !e.shiftKey) {
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
    },
    [html]
  );

  useEffect(() => {
    const htmlChanged = props.html !== html;
    const tagChanged = props.tag !== tag;

    if (htmlChanged || tagChanged) {
      props.updatePage({
        id: props.id,
        html: html,
        tag: tag,
      });
    }
  }, [html, tag, props]);

  return (
    <>
      {selectMenuIsOpen && <div>메뉴</div>}
      <StyledBlock
        id={props.id}
        innerRef={ref}
        html={html}
        tagName={tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        placeholder="내용을 입력하세요"
      />
    </>
  );
});

const StyledBlock = styled(ContentEditable)`
  background: #f3f3f3;
  outline: none;

  :focus:empty:before {
    content: attr(placeholder);
    color: #999;
  }
`;
