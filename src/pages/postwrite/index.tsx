import styled from "styled-components";
import { KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import { observer } from "mobx-react-lite";
import { SelectOption } from "@types";
import { useRefCallback } from "common/utils";
import postService from "common/axios/postService";
import CategoryStore from "common/store/CategoryStore";
import EditorStore from "common/store/EditorStore";
import { EditableBlock, Select } from "components";

export default observer(function PostWritePage() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<SelectOption[]>([]);
  const [categoryId, setCategoryId] = useState(0);
  const [title, setTitle] = useState("");
  const { blocks } = EditorStore;

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

  const setTextStyle = (
    style: "italic" | "bold" | "strikeThrough" | "underline"
  ) => {
    document.execCommand(style);
  };

  const submit = () => {
    postService
      .createPost({
        userId: "nuuuri",
        categoryId: categoryId,
        title: title,
        blocks: blocks.map((block) => {
          return { html: block.html, tag: block.tag };
        }),
      })
      .then(() => {
        navigate("/", { replace: true });
      });
  };

  useEffect(() => {
    CategoryStore.getCategorySelectOptions().then((res: any) => {
      setCategoryList(res);
    });
  }, []);

  return (
    <Canvas>
      <div style={{ display: "flex" }}>
        <Select
          label="카테고리"
          placeholder="카테고리 선택"
          onChange={setCategoryId}
          options={categoryList}
          style={{ width: 180, margin: "0 10px 0 0" }}
        />

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
        <EditableBlock key={block.id} data={block.data} />
      ))}

      {/*       {menu.isOpen && <EditMenu position={{ x: menu.x, y: menu.y }} />} */}

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
});

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
