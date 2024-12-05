import { useEffect, useState } from "react";
import { useIngredientContext } from "../context/useIngredientContextProvider";

export function HomePage() {
  const { successToast } = useIngredientContext();
  const [locString, setLocString] = useState<string>("");
  const saveToLocalStorage = (value: string) => {
    localStorage.setItem("myData", value);
    setLocString(value); // Update state
  };
  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      setLocString(storedData); // Set the state with the value from localStorage
    }
  }, []);
  return (
    <>
      <div>this is the HomePage</div>
      <button onClick={() => successToast("this is visible!!!!")}>
        {" "}
        make toast
      </button>

      <p>Stored Data: {locString}</p>
      <input></input>
      <button onClick={() => saveToLocalStorage("Hello, Aaron this is you")}>
        Save Data
      </button>
    </>
  );
}
