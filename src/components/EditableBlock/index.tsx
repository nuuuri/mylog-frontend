import styled from "styled-components";
import { KeyboardEvent, memo, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Block } from "@types";
import { useRefCallback } from "common/utils";

interface Props {
  data: Block;
  setData: (currentBlock: Block) => void;
  onKeyDownBlock: (currentBlock: Block, e: KeyboardEvent) => void;
}

export default memo(function EditableBlock({
  data,
  setData,
  onKeyDownBlock,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onChange = useRefCallback(
    (e: ContentEditableEvent) => {
      resize(e);
      setData({
        ...data,
        html: e.target.value,
      });
    },
    [data]
  );

  const onKeyDown = useRefCallback(
    (e: KeyboardEvent) => {
      if (ref.current) {
        onKeyDownBlock(data, e);
      }
    },
    [data]
  );

  const resize = (e: any) => {
    const obj = e.currentTarget;

    obj.style.height = ""; // 다시 줄어들 때 필요
    obj.style.height = obj.scrollHeight + "px";
  };

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
    />
  );
});

const StyledContentEditable = styled(ContentEditable)`
  width: 100%;
  background: #f3f3f3;
  outline: none;
  font-family: "sans-serif";
  line-height: 25px;

  overflow: auto;
  white-space: pre-wrap;

  :focus:empty:before {
    content: attr(placeholder);
    color: #999;
  }
`;
