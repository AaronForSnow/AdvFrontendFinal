
import { createContext, useContext } from "react";
import { Ingredient } from "../Data/Ingredient";
export interface IngredientContextInterface {
    ingredients: Ingredient [];
    isLoading: boolean;
}

export const ingredientContext = createContext<IngredientContextInterface>({
    ingredients: [],
    isLoading: false,
});

export const useIngredientContext = () => {
    return useContext(ingredientContext);
};


