import { getCaretCoordinates } from "common/utils/caretHelpers";
import { useRefCallback } from "common/utils/useRefCallback";
import { memo, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

export default memo(function EditableBlock(props: {
  id: string;
  className?: string;
  tag: string;
  html: string;
  updatePage: Function;
  addBlock: Function;
  deleteBlock: Function;
  movePrevBlock: Function;
  moveNextBlock: Function;
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

      if (e.key === "ArrowUp") {
        /*  const caretCoordinates = getCaretCoordinates();
        const boundingRect = e.target.getBoundingClientRect();
        const isCaretTop = caretCoordinates.y! <= boundingRect.y;

        console.log(caretCoordinates.y, boundingRect.y);

        if (isCaretTop) {
          e.preventDefault();
          console.log("prev");
        } */

        if (
          html === "" ||
          window.getSelection()?.focusNode === e.target.firstChild
        ) {
          e.preventDefault();
          props.movePrevBlock({
            id: props.id,
            ref: ref.current,
          });
        }
      }

      if (e.key === "ArrowDown") {
        if (
          html === "" ||
          window.getSelection()?.focusNode === e.target.lastChild
        ) {
          e.preventDefault();
          props.moveNextBlock({
            id: props.id,
            ref: ref.current,
          });
        }
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
      <ContentEditable
        id={props.id}
        className={props.className}
        innerRef={ref}
        html={html}
        tagName={tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        placeholder="내용을 입력하세요"
        spellCheck="false"
      />
    </>
  );
});
