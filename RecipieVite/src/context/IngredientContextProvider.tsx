import { FC, ReactNode, useEffect, useState } from "react";
import { ingredientContext } from "./useIngredientContextProvider";
import { Ingredient } from "../Data/Ingredient";
import { APIService } from "../Services/APIService";
import { Customer } from "../Data/Customer";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "react-oidc-context";
import { Recipie } from "../Data/Recipie";

export const IngredientContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [recipies, setRecipies] = useState<Recipie[]>([]);

  useEffect(() => {
    setIsLoading(true);
    APIService.getAllIngredients().then((tempIngredients) => {
      if (tempIngredients) {
        setIngredients(tempIngredients);
      }
    });
    APIService.getRecipies().then((tempRecipies) => {
      if (tempRecipies) {
        setRecipies(tempRecipies);
      }
    });
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth.user) {
        const email = auth.user.profile.email || "";
        getOrMakeCustomer(email);
      }
    }
  }, [auth.isAuthenticated, auth.user]);

  const getOrMakeCustomer = async (email: string) => {
    if (auth.isAuthenticated) {
      try {
        const customer = await APIService.getCustomer(email);
        if (customer.email) {
          setCustomer(customer);
          console.log("found customer");
        } else {
          console.log("trying to add customer");
          const name: string = auth.user?.profile.name || "username"
          const c: Customer = {email: email, username: name, id: undefined}
          const newCustomer = await APIService.postCustomer(c);
          if (newCustomer.email) {
            setCustomer(newCustomer);
            console.log("added customer");
          } else {
            console.error("Failed to create customer");
          }
        }
      } catch (error) {
        console.error("Error fetching or creating customer:", error);
      }
    }
  };
  const addIngredient = async (i: Ingredient) => {
    APIService.addIngredient(i).then((tempIngredients) => {
      if (tempIngredients) {
        setIngredients(tempIngredients);
      }
    });
  };
  const addRecipie = async (r: Recipie) => {
    APIService.AddRecipie(r).then((tempRecipies) => {
      if (tempRecipies) {
        setRecipies(tempRecipies);
      }
    });
  };
  const successToast = async (message: string) => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);
    toast.success(message, {
      autoClose: 3000,
    });
  };

  return (
    <ingredientContext.Provider
      value={{
        ingredients: ingredients,
        addIngredient: addIngredient,
        isLoading: isLoading,
        customer: customer,
        // getCustomer: getOrMakeCustomer,
        successToast: successToast,
        recipies: recipies,
        addRecipie: addRecipie,
      }}
    >
      <>
        {children}
        <ToastContainer />
      </>
    </ingredientContext.Provider>
  );
};
