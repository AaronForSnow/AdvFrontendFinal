import { ToastContainer } from "react-toastify";
import { useIngredientContext } from "../context/useIngredientContextProvider";
import { Ingredient } from "../Data/Ingredient";
import { GoTo } from "./NavBar";
import { PlainSpinner } from "./PlainSpinner";
import SingleIngredient from "./SingleIngredient";

export function Ingredients() {
  const { ingredients, isLoading } = useIngredientContext();

  return (
    <>
      <div className="m-4">
        <GoTo locString="addIngredient"></GoTo>
      </div>
      {isLoading && <PlainSpinner />}
      {!isLoading && (
        <div className="d-flex flex-wrap justify-content-center">
          {ingredients.map((i: Ingredient) => (
            <div key={i.id}>
              <SingleIngredient Ingredient={i} />
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </>
  );
}
