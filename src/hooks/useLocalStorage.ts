import { useState } from "react";

type UseLocalStorage = <T = string>(key: string, initialValue?: T) => [T, (newValue: T) => void];

export const useLocalStorage: UseLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  return [
    storedValue,
    (newValue) => {
      try {
        setStoredValue(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(error);
      }
    },
  ];
};
