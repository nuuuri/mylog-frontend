import { useId, useState } from "react";
import styled from "styled-components";
import EditableBlock from "./EditableBlock";

export default function PostWritePage() {
  const [blocks, setBlocks] = useState<
    { id: string; html: string; tag: string }[]
  >([{ id: useId(), html: "", tag: "p" }]);

  return (
    <Container>
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

      <Canvas>
        {blocks.map((block, key) => (
          <EditableBlock key={key} tag={block.tag} html={block.html} />
        ))}
      </Canvas>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #e9e9e9; ;
`;
const PostMenu = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background: yellow;
`;
const Toolbar = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background: pink;
`;
const Canvas = styled.div`
  width: 80%;
  height: calc(100% - 140px);
  margin-top: 10px;
  background: #fff;
`;
