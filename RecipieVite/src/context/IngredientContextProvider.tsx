import { FC, ReactNode, useEffect, useState } from "react";
import { ingredientContext } from "./useIngredientContextProvider";
import { Ingredient } from "../Data/Ingredient";
import { APIService } from "../Services/APIService";
import { Customer } from "../Data/Customer";

export const IngredientContextProvider: FC<{ children: ReactNode }> =({
    children,
}) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [customer, setCustomer] = useState<Customer | undefined>(undefined);

    useEffect(() => {
        setIsLoading(true)
        APIService.getAllIngredients().then((tempIngredients) => {
            if (tempIngredients) {
                setIngredients(tempIngredients);
            }
        })
        setIsLoading(false)
    },[])

    const getOrMakeCustomer = async (email: string) => {
        const c = await APIService.getCustomer(email);
        if (c.email){
            setCustomer(c)
        }
        else {
            //set customer to api
        }
    }

    return (
        <ingredientContext.Provider
        value={{
            ingredients: ingredients,
            isLoading: isLoading,
            customer: customer,
            getCustomer: getOrMakeCustomer,
        }}>
            {children}
        </ingredientContext.Provider>
    )
}