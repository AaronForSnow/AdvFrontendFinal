
import { createContext, useContext } from "react";
import { Ingredient } from "../Data/Ingredient";
import { Customer } from "../Data/Customer";
export interface IngredientContextInterface {
    ingredients: Ingredient [];
    addIngredient: (i: Ingredient) => void;
    isLoading: boolean;
    customer: Customer | undefined;
    // getCustomer: (email: string) => void;
    successToast: (message: string) => void;
}

export const ingredientContext = createContext<IngredientContextInterface>({
    ingredients: [],
    addIngredient: () => {},
    isLoading: false,
    customer: undefined,
    // getCustomer: () => {},
    successToast: () => {},
});

export const useIngredientContext = () => {
    return useContext(ingredientContext);
};


