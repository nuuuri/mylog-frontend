export const getCaretCoordinates = () => {
  let x, y;
  const isSupported = typeof window.getSelection !== "undefined";

  if (isSupported) {
    const selection = window.getSelection()!;
    // Check if there is a selection (i.e. cursor in place)

    if (selection.rangeCount !== 0) {
      // Clone the range
      const range = selection.getRangeAt(0).cloneRange();
      // Collapse the range to the start, so there are not multiple chars selected
      range.collapse(false);
      // getCientRects returns all the positioning information we need
      const rect = range.getBoundingClientRect();

      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
  }
  return { x, y };
};

export const setCaretToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();

  if (element.hasChildNodes()) {
    range.selectNodeContents(element.lastChild!);
  } else {
    range.selectNodeContents(element);
  }

  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);

  element.focus();
};

export const getElementLineHeight = (element: HTMLElement) => {
  return element.style.lineHeight
    ? +element.style.lineHeight.split("px")[0]
    : 21;
};

export const isCaretTopOfElement = (element: HTMLElement) => {
  const caretCoordinates = getCaretCoordinates();
  const boundingRect = element.getBoundingClientRect();

  return caretCoordinates.y! - getElementLineHeight(element) < boundingRect.top;
};

export const isCaretBottomOfElement = (element: HTMLElement) => {
  const caretCoordinates = getCaretCoordinates();
  const boundingRect = element.getBoundingClientRect();

  return (
    caretCoordinates.y! + getElementLineHeight(element) >= boundingRect.bottom
  );
};
