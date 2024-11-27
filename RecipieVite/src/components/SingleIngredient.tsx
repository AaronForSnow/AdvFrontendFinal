import { FC } from "react";
import { Ingredient } from "../Data/Ingredient";

const SingleIngredient: FC<{ Ingredient: Ingredient }> = ({ Ingredient }) => {
    return (
      <li key={Ingredient.id.toString() + "parent"} className="card m-2 border-dark" style={{ width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">{Ingredient.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{Ingredient.description}</h6>
        </div>
      </li>
    );
  };
  
  export default SingleIngredient;