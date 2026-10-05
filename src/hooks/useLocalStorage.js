import { useCallback, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  // useCallback để hàm saveValue không đổi giữa các lần render
  const saveValue = useCallback(
    (newValue) => {
      setValue((prev) => {
        const valueToSave = typeof newValue === "function" ? newValue(prev) : newValue;
        localStorage.setItem(key, JSON.stringify(valueToSave));
        return valueToSave;
      });
    },
    [key],
  );

  return [value, saveValue];
}

export default useLocalStorage;
