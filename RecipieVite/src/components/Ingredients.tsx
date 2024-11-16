import { useIngredientContext } from "../context/useIngredientContextProvider"
import { Ingredient } from "../Data/Ingredient";


export function Ingredients () {
    const { ingredients,isLoading } = useIngredientContext();
    return (
        <>
            {!isLoading && 
        <div>
            {ingredients.map((i: Ingredient) => (
                <li key={i.id.toString() + "parent"}>
                    <ul>
                        <li key={i.id.toString() + "child"}>{i.id}</li>
                        <li key={i.name + "child"}>{i.name}</li>
                        <li key={i.description + "child"}>{i.description}</li>
                    </ul>
                </li>
            ))}
            </div>
        }
        </>
    )
}