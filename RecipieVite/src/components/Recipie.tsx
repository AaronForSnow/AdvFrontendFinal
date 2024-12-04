import { FC } from "react";
import { Recipie } from "../Data/Recipie";
import { RecipieIngredient } from "../Data/RecipieIngredient";

const SingleRecipie: FC<{ recipie: Recipie }> = ({ recipie }) => {
  return (
    <>
      <li
        key={recipie.id.toString() + "parent"}
        className="card m-2 border-dark"
        style={{ width: "18rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">{recipie.recipie_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {recipie.description}
          </h6>
        </div>
        <ul>
          {recipie.ingredients.map((i: RecipieIngredient) => (
            <div key={i.ingredient.id}>
              <li>{i.ingredient.name} {i.quantity} {i.unit}</li>
            </div>
          ))}
        </ul>
      </li>
    </>
  );
};
export default SingleRecipie;
