import styled from "styled-components";
import { memo, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import {
  isCaretBottomOfElement,
  isCaretTopOfElement,
  setCaretToEnd,
  useRefCallback,
} from "common/utils";
import store from "common/store/EditorStore";
import { TAGS } from "common/store/EditorStore/type";

interface Props {
  data: { id: string | number; html: string; tag: TAGS };
}

export default memo(function EditableBlock({ data }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { addBlock, updateBlock, deleteBlock } = store;

  const onChange = useRefCallback(
    (e: ContentEditableEvent) => {
      updateBlock({
        id: data.id + "",
        html: e.target.value.replace("<br>", "\n"),
        tag: data.tag,
      });
    },
    [data]
  );

  const onKeyDown = useRefCallback(
    (e: any) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addBlock(data.id + "").then((nextBlock) => {
          nextBlock.getBlockElement().focus();
        });
      }

      if (e.key === "Backspace" && data.html === "") {
        e.preventDefault();
        deleteBlock(data.id + "").then((previousBlock) => {
          if (previousBlock) {
            setCaretToEnd(previousBlock.getBlockElement());
          }
        });
      }

      if (e.key === "ArrowUp") {
        if (data.html === "" || isCaretTopOfElement(e.target)) {
          e.preventDefault();

          const previousBlockElement = store
            .getBlock(data.id + "")
            .getPreviousBlockElement();

          setCaretToEnd(previousBlockElement);
        }
      }

      if (e.key === "ArrowDown") {
        if (data.html === "" || isCaretBottomOfElement(e.target)) {
          e.preventDefault();

          const nextBlockElement = store
            .getBlock(data.id + "")
            .getNextBlockElement();

          nextBlockElement.focus();
        }
      }
    },
    [data]
  );

  return (
    <StyledContentEditable
      innerRef={ref}
      id={String(data.id)}
      className="post-contents"
      html={data.html}
      tagName={data.tag}
      spellCheck="false"
      placeholder="내용을 입력하세요"
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{ lineHeight: "25px" }}
    />
  );
});

const StyledContentEditable = styled(ContentEditable)`
  font-family: "sans-serif";
  width: 100%;
  background: #f3f3f3;
  outline: none;
  white-space: pre-wrap;

  :focus:empty:before {
    content: attr(placeholder);
    color: #999;
  }
`;
