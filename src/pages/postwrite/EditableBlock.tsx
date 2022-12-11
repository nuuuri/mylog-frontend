import styled from "styled-components";
import { KeyboardEvent, memo, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Block } from "@types";
import { useRefCallback } from "common/utils/useRefCallback";

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
      const value = e.target.value === "<br>" ? "" : e.target.value;

      setData({
        ...data,
        html: value,
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
  background: #f3f3f3;
  outline: none;

  :focus:empty:before {
    content: attr(placeholder);
    color: #999;
  }
`;

const Menu = styled.div`
  position: absolute;
  bottom: -104px;
  width: 150px;
  height: 100px;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  z-index: 1;
`;
