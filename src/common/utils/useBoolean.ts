import { useCallback, useState } from "react";

export const useBoolean = (defaultValue?: boolean) => {
  const [value, setValue] = useState(!!defaultValue); // !! 문법: undefined, null일 때도 false 반환

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return { value, setValue, setTrue, setFalse, toggle };
};
