import styled from "styled-components";
import { KeyboardEvent, memo, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface Props {
  data: { id: string | number; html: string; tag: string };
  onChange: (e: ContentEditableEvent) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
}

export default memo(function Block({ data, ...props }: Props) {
  const ref = useRef<HTMLElement>(null);

  return (
    <StyledContentEditable
      {...props}
      innerRef={ref}
      id={String(data.id)}
      className="post-contents"
      html={data.html}
      tagName={data.tag}
      spellCheck="false"
      placeholder="내용을 입력하세요"
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
