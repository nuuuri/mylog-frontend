import { setCaretToEnd } from "common/utils/caretHelpers";
import { useCallback, useState } from "react";
import styled from "styled-components";
import EditableBlock from "./EditableBlock";

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export default function PostWritePage() {
  const [blocks, setBlocks] = useState<
    { id: string; html: string; tag: string }[]
  >([{ id: uid(), html: "", tag: "p" }]);

  const updatePageHandler = useCallback(
    (updatedBlock: { id: string; html: string; tag: string }) => {
      setBlocks((state) => {
        const index = state.map((b) => b.id).indexOf(updatedBlock.id);
        const updatedBlocks = [...state];
        updatedBlocks[index] = { ...updatedBlock };

        return updatedBlocks;
      });
    },
    []
  );

  const addBlockHandler = useCallback(
    (currentBlock: { id: string; ref: any }) => {
      const addBlock = async () => {
        const newBlock = { id: uid(), html: "", tag: "p" };
        setBlocks((b) => [...b, newBlock]);
      };

      addBlock().then(() => {
        currentBlock.ref.nextElementSibling.focus();
      });
    },
    []
  );

  const deleteBlockHandler = useCallback(
    (currentBlock: { id: string; ref: any }) => {
      const previousBlock = currentBlock.ref.previousElementSibling;

      if (previousBlock) {
        const deleteBlock = async () =>
          setBlocks((b) => b.filter((block) => block.id !== currentBlock.id));

        deleteBlock().then(() => {
          setCaretToEnd(previousBlock);
          previousBlock.focus();
        });
      }
    },
    []
  );

  return (
    <Canvas>
      {blocks.map((block, key) => (
        <EditableBlock
          key={key}
          id={block.id}
          tag={block.tag}
          html={block.html}
          updatePage={updatePageHandler}
          addBlock={addBlockHandler}
          deleteBlock={deleteBlockHandler}
        />
      ))}
    </Canvas>
  );
}

const Canvas = styled.div`
  box-sizing: border-box;
  width: 80%;
  height: 90%;
  margin: auto;
  padding: 30px 80px;
  background: #fff;
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
