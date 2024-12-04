
import { createContext, useContext } from "react";
import { Ingredient } from "../Data/Ingredient";
import { Customer } from "../Data/Customer";
import { Recipie } from "../Data/Recipie";
export interface IngredientContextInterface {
    ingredients: Ingredient [];
    addIngredient: (i: Ingredient) => void;
    isLoading: boolean;
    customer: Customer | undefined;
    successToast: (message: string) => void;
    recipies: Recipie[];
    addRecipie: (r: Recipie) => void;
}

export const ingredientContext = createContext<IngredientContextInterface>({
    ingredients: [],
    addIngredient: () => {},
    isLoading: false,
    customer: undefined,
    successToast: () => {},
    recipies: [],
    addRecipie: () => {},
});

export const useIngredientContext = () => {
    return useContext(ingredientContext);
};


