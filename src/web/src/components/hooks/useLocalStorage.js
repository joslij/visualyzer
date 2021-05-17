import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storageItem, setStorageItem] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStorageItem(value);
  };

  return [storageItem, setValue];
};

export default useLocalStorage;
