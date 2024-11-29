import { FC, ReactNode, useEffect, useState } from "react";
import { ingredientContext } from "./useIngredientContextProvider";
import { Ingredient } from "../Data/Ingredient";
import { APIService } from "../Services/APIService";
import { Customer } from "../Data/Customer";
import { toast, ToastContainer } from "react-toastify";

export const IngredientContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    APIService.getAllIngredients().then((tempIngredients) => {
      if (tempIngredients) {
        setIngredients(tempIngredients);
      }
    });
    setIsLoading(false);
  }, []);

  const getOrMakeCustomer = async (email: string) => {
    const c = await APIService.getCustomer(email);
    if (c.email) {
      setCustomer(c);
    } else {
      //set customer to api
    }
  };
  const addIngredient = async (i: Ingredient) => {
    APIService.addIngredient(i).then((tempIngredients) => {
      if (tempIngredients) {
        setIngredients(tempIngredients);
      }
    });
  };
  const successToast = async (message: string) => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    // console.log("Waiting for delay...");
    await delay(1000);
    toast.success(message, {
      autoClose: 3000, 
    });
    // console.log("After delay...");
  };

  return (
    <ingredientContext.Provider
      value={{
        ingredients: ingredients,
        addIngredient: addIngredient,
        isLoading: isLoading,
        customer: customer,
        getCustomer: getOrMakeCustomer,
        successToast: successToast,
      }}
    >
      <>
        {children}
        <ToastContainer />
      </>
    </ingredientContext.Provider>
  );
};
