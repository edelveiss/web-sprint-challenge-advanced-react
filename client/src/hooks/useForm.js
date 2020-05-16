// write your custom hook here to control your checkout form
import { useLocalStorage } from "./useLocalStorage";

export const useForm = (initialState, key, submitLogic) => {
  const [values, setValues] = useLocalStorage(initialState, key);

  const handleChanges = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = (e) => {
    setValues(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogic();
    //clearForm();
  };

  //return [values, handleChanges, clearForm];
  return [values, handleChanges, clearForm, handleSubmit];
};
