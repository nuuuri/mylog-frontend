import postService from "common/axios/postService";
import { setCaretToEnd } from "common/utils/caretHelpers";
import { useRefCallback } from "common/utils/useRefCallback";
import HeaderLayout from "layouts/HeaderLayout";
import { KeyboardEvent, useCallback, useState } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import EditableBlock from "./EditableBlock";

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const deepcopy = (list: any[]) => {
  return list.map((obj) => {
    return { ...obj };
  });
};

export default function PostWritePage() {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<
    { id: string; html: string; tag: string }[]
  >([{ id: uid(), html: "", tag: "p" }]);

  const onKeyDownTitleHandler = useRefCallback(
    (e: KeyboardEvent) => {
      if (e.key === " " && title === "") {
        e.preventDefault();
      }

      if (e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        (
          document.getElementById("post-title")!
            .nextElementSibling as HTMLElement
        ).focus();
      }
    },
    [title]
  );

  const updatePageHandler = useCallback(
    (updatedBlock: { id: string; html: string; tag: string }) => {
      setBlocks((state) => {
        const index = state.map((b) => b.id).indexOf(updatedBlock.id);
        const updatedBlocks = deepcopy(state);
        updatedBlocks[index] = { ...updatedBlock };

        return updatedBlocks;
      });
    },
    []
  );

  const addBlockHandler = useCallback(
    (currentBlock: { id: string; ref: any }) => {
      (async function () {
        const newBlock = { id: uid(), html: "", tag: "p" };
        setBlocks((state) => {
          const index = state.map((b) => b.id).indexOf(currentBlock.id);
          const updatedBlocks = deepcopy(state);
          updatedBlocks.splice(index + 1, 0, newBlock);

          return updatedBlocks;
        });
      })().then(() => {
        currentBlock.ref.nextElementSibling.focus();
      });
    },
    []
  );

  const deleteBlockHandler = useCallback(
    (currentBlock: { id: string; ref: any }) => {
      const previousBlock = currentBlock.ref.previousElementSibling;

      if (previousBlock && previousBlock.id !== "post-title") {
        (async function () {
          setBlocks((b) => b.filter((block) => block.id !== currentBlock.id));
        })().then(() => {
          previousBlock.focus();
          setCaretToEnd(previousBlock);
        });
      }
    },
    []
  );

  const movePrevBlockHandler = (currentBlock: { id: string; ref: any }) => {
    const previousBlock = currentBlock.ref.previousElementSibling;

    if (previousBlock) {
      previousBlock.focus();
      setCaretToEnd(previousBlock);
    }
  };

  const moveNextBlockHandler = (currentBlock: { id: string; ref: any }) => {
    const nextBlock = currentBlock.ref.nextElementSibling;

    if (nextBlock) {
      nextBlock.focus();
    }
  };

  const setTextStyle = (
    style: "italic" | "bold" | "strikeThrough" | "underline"
  ) => {
    document.execCommand(style);
  };

  const submit = async () => {
    const userId = "nuuuri";
    const categoryId = 1;

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
      <ContentEditable
        id="post-title"
        html={title}
        tagName="h1"
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyDownTitleHandler}
        placeholder="제목 없음"
      />
      {blocks.map((block) => (
        <EditableBlock
          key={block.id}
          id={block.id}
          className="post-contents"
          html={block.html}
          tag={block.tag}
          updatePage={updatePageHandler}
          addBlock={addBlockHandler}
          deleteBlock={deleteBlockHandler}
          movePrevBlock={movePrevBlockHandler}
          moveNextBlock={moveNextBlockHandler}
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
  padding: 30px 80px;
  background: #fff;

  #post-title,
  .post-contents {
    background: #f3f3f3;
    outline: none;
  }

  #post-title {
    :empty:before {
      content: attr(placeholder);
      color: #999;
    }
  }

  .post-contents {
    :focus:empty:before {
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
