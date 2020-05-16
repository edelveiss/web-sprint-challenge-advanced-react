import { useLocalStorage } from "./useLocalStorage.js";
export const useShowMessage = (key, initialValue) => {
  const [values, setValues] = useLocalStorage(key, initialValue);
  return [values, setValues];
};
