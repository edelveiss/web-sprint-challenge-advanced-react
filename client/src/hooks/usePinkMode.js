import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const usePinkMode = (initialValue) => {
  const [value, setValue] = useLocalStorage("toggled", initialValue);
  useEffect(() => {
    const body = document.querySelector("body");
    //const plantDetails = document.querySelector("#pink-plant");
    //console.log("plantDetails", plantDetails);

    if (localStorage.getItem("toggled")) {
      body.classList.toggle("dark-mode");
      // plantDetails.classList.toggle("plant-details-pink");
    }
  }, [value]);
  return [value, setValue];
};
