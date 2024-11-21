
import { createContext, useContext } from "react";
import { Ingredient } from "../Data/Ingredient";
import { Customer } from "../Data/Customer";
export interface IngredientContextInterface {
    ingredients: Ingredient [];
    isLoading: boolean;
    customer: Customer | undefined;
    getCustomer: (email: string) => void;
}

export const ingredientContext = createContext<IngredientContextInterface>({
    ingredients: [],
    isLoading: false,
    customer: undefined,
    getCustomer: () => {},
});

export const useIngredientContext = () => {
    return useContext(ingredientContext);
};


