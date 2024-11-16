import { FC, ReactNode, useEffect, useState } from "react";
import { ingredientContext } from "./useIngredientContextProvider";
import { Ingredient } from "../Data/Ingredient";
import { APIService } from "../Services/APIService";

export const IngredientContextProvider: FC<{ children: ReactNode }> =({
    children,
}) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true)
        APIService.getAllIngredients().then((tempIngredients) => {
            if (tempIngredients) {
                setIngredients(tempIngredients);
            }
            else {
                setIngredients([
                    {
                        id: 1,
                        name: "not an ingredient",
                        description: "not a description",
                    },
                ]);
            }
        })
        setIsLoading(false)
    },[])

    return (
        <ingredientContext.Provider
        value={{
            ingredients: ingredients,
            isLoading: isLoading,
        }}>
            {children}
        </ingredientContext.Provider>
    )
}