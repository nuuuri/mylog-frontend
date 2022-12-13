import { KeyboardEvent, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import { Block } from "@types";
import { useRefCallback } from "common/utils/useRefCallback";
import { useEditableBlocks } from "common/utils/useEditableBlocks";
import EditableBlock from "./EditableBlock";
import postService from "common/axios/postService";
import { getCaretCoordinates } from "common/utils/caretHelpers";

const CATEGORY = [
  { id: 1, label: "Frontend", name: "Frontend", subCategories: [] },
  { id: 2, label: "Backend", name: "Backend", subCategories: [] },
];

const lineHeight = 25;

export default function PostWritePage() {
  const [categoryId, setCategoryId] = useState(0);
  const [title, setTitle] = useState("");
  const {
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
    focusOnPreviousBlock,
    focusOnNextBlock,
  } = useEditableBlocks();

  const onKeyDownTitle = useRefCallback(
    (e: KeyboardEvent) => {
      if (e.key === " " && title === "") {
        e.preventDefault();
      }

      if (e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();

        const firstBlock = document.getElementsByClassName(
          "post-contents"
        )[0] as HTMLElement;

        firstBlock.focus();
      }
    },
    [title]
  );

  const onKeyDownEditableBlock = useRefCallback(
    (currentBlock: Block, e: any) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addBlock(currentBlock);
      }

      if (e.key === "Backspace" && currentBlock.html === "") {
        e.preventDefault();
        deleteBlock(currentBlock);
      }

      if (e.key === "ArrowUp") {
        const caretCoordinates = getCaretCoordinates();
        const boundingRect = e.target.getBoundingClientRect();
        const isCaretTop = caretCoordinates.y! - lineHeight <= boundingRect.top;

        if (currentBlock.html === "" || isCaretTop) {
          e.preventDefault();
          focusOnPreviousBlock(currentBlock);
        }
      }

      if (e.key === "ArrowDown") {
        const caretCoordinates = getCaretCoordinates();
        const boundingRect = e.target.getBoundingClientRect();
        const isCaretBottom =
          caretCoordinates.y! + lineHeight >= boundingRect.bottom;

        if (currentBlock.html === "" || isCaretBottom) {
          e.preventDefault();
          focusOnNextBlock(currentBlock);
        }
      }
    },
    [addBlock, deleteBlock, focusOnPreviousBlock, focusOnNextBlock]
  );

  const setTextStyle = (
    style: "italic" | "bold" | "strikeThrough" | "underline"
  ) => {
    document.execCommand(style);
  };

  const submit = async () => {
    const userId = "nuuuri";

    await postService
      .createPost({
        userId: userId,
        categoryId: categoryId,
        title: title,
        blocks: blocks.map((block) => {
          return { html: block.html, tag: block.tag };
        }),
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <Canvas>
      <div style={{ display: "flex" }}>
        <select
          style={{ width: "150px", marginRight: "10px" }}
          defaultValue={0}
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
        >
          <option disabled hidden value={0}>
            카테고리 선택
          </option>
          {CATEGORY.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ContentEditable
          id="post-title"
          html={title}
          tagName="h1"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={onKeyDownTitle}
          placeholder="제목 없음"
        />
      </div>

      {blocks.map((block) => (
        <EditableBlock
          key={block.id}
          data={block}
          setData={updateBlock}
          onKeyDownBlock={onKeyDownEditableBlock}
        />
      ))}

      <button onClick={() => setTextStyle("bold")}>B</button>
      <button onClick={() => setTextStyle("italic")}>I</button>
      <button
        onClick={() => setTextStyle("strikeThrough")}
        style={{ textDecoration: "line-through" }}
      >
        T
      </button>
      <button
        onClick={() => setTextStyle("underline")}
        style={{ textDecorationLine: "underline" }}
      >
        U
      </button>

      <Button onClick={submit}>저장하기</Button>
    </Canvas>
  );
}

const Canvas = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 80%;
  height: 90%;
  margin: auto;
  padding: 40px 80px;
  background: #fff;

  #post-title {
    width: calc(100% - 160px);
    margin: 0;
    background: #f3f3f3;
    outline: none;

    :empty:before {
      content: attr(placeholder);
      color: #999;
    }
  }
`;
const Button = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

/*
  <PostMenu>
      <div>사진</div>
        <div>동영상</div>
        <div>스티커</div>
        <div>인용구</div>
        <div>구분선</div>
        <div>장소</div>
        <div>링크</div>
        <div>파일</div>
        <div>일정</div>
        <div>소스코드</div>
        <div>표</div>
        <div>수식</div>
  </PostMenu>
  <Toolbar>
        <div>본문(문단 서식)</div>
        <div>나눔고딕(서체)</div>
        <div>15(글자 크기)</div>

        <div>B(굵기 적용)</div>
        <div>I(기울이기 적용)</div>
        <div>U(밑줄 적용)</div>
        <div>T(취소선 적용)</div>
        <div>글자색 변경</div>
        <div>글자 배경색 변경</div>

        <div>정렬</div>
        <div>줄간격</div>
        <div>목록</div>

        <div>머리글자 적용</div>
        <div>위첨자 적용</div>
        <div>아래첨자 적용</div>
        <div>특수문자</div>
        <div>링크 입력</div>
        <div>맞춤법</div>
  </Toolbar> 
*/
