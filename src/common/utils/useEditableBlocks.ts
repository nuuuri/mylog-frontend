import { Block } from "@types";
import { useCallback, useState } from "react";
import { setCaretToEnd } from "./caretHelpers";
import { uid } from "./functions";

export const useEditableBlocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: uid(), html: "", tag: "p" },
  ]);

  const addBlock = useCallback((currentBlock: Block) => {
    const newBlock: Block = { id: uid(), html: "", tag: "p" };

    (async function () {
      setBlocks((state) => {
        const index = state.map((b) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...state];
        updatedBlocks.splice(index + 1, 0, newBlock);

        return updatedBlocks;
      });
    })().then(() => {
      const currentBlockElement = document.getElementById(
        String(currentBlock.id)
      );

      (currentBlockElement?.nextElementSibling as HTMLElement).focus();
    });
  }, []);

  const updateBlock = useCallback((currentBlock: Block) => {
    setBlocks((blocks) => {
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks[index] = { ...currentBlock };

      return updatedBlocks;
    });
  }, []);

  const deleteBlock = useCallback((currentBlock: Block) => {
    const previousBlock = document.getElementById(String(currentBlock.id))
      ?.previousElementSibling as HTMLElement;

    if (previousBlock && previousBlock.classList.contains("post-contents")) {
      (async function () {
        setBlocks((b) => b.filter((block) => block.id !== currentBlock.id));
      })().then(() => {
        setCaretToEnd(previousBlock);
      });
    }
  }, []);

  const focusOnPreviousBlock = useCallback((currentBlock: Block) => {
    const previousBlock = document.getElementById(String(currentBlock.id))
      ?.previousElementSibling as HTMLElement;

    if (previousBlock) {
      setCaretToEnd(previousBlock);
    }
  }, []);

  const focusOnNextBlock = useCallback((currentBlock: Block) => {
    const nextBlock = document.getElementById(String(currentBlock.id))
      ?.nextElementSibling as HTMLElement;

    if (nextBlock) {
      nextBlock.focus();
    }
  }, []);

  return {
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
    focusOnPreviousBlock,
    focusOnNextBlock,
  };
};