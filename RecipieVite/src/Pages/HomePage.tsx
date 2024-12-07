import { useEffect, useState } from "react";
import { useIngredientContext } from "../context/useIngredientContextProvider";
import { useAuth } from "react-oidc-context";

export function HomePage() {
  const { successToast } = useIngredientContext();
  const [locString, setLocString] = useState<string>("");
  const auth = useAuth();
  const saveToLocalStorage = () => {
    if (auth.isAuthenticated) {
      localStorage.setItem(
        "myData",
        "When you clicked the button you were signed in as: " +
          auth.user?.profile.name
      );
      setLocString(
        "When you clicked the button you were signed in as: " +
          auth.user?.profile.name
      );
    } else {
      localStorage.setItem(
        "myData",
        "Upon a button clicked... You were nobody... :("
      );
      setLocString("Upon a button clicked... You were nobody... :(");
    }
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
      <button onClick={() => saveToLocalStorage()}>
        Button Click... please
      </button>
      {auth.isAuthenticated &&
        auth.user?.profile.email === "aaron.allen@students.snow.edu" && (
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Rick Roll Video"
              allow="autoplay"
            ></iframe>
          </div>
        )}
    </>
  );
}
