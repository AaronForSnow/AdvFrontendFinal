import axios from "axios";
import { Ingredient } from "../Data/Ingredient";
import { Customer } from "../Data/Customer";


const apiUrl: string = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    console.log("didn't get a proper env url in itemAPIService");
}
else {
    console.log("env API-url: ", apiUrl);
}

export const APIService = {
    getAllIngredients: async () => {
        const response = await axios.get(apiUrl + "Ingredient/getall");
        const responseIngredients: Ingredient[] = response.data;
        return responseIngredients;
    },
    addIngredient: async (i: Ingredient) => {
        const response = await axios.post(apiUrl + "Ingredient/add", i);
        const responseIngredients: Ingredient[] = response.data;
        return responseIngredients;
    },
    getCustomer: async (email: string) => {
        const response = await axios.get(apiUrl + "Customer/get/" + email || "john_doe@example.com");
        const customer: Customer = response.data;
        return customer;
    }
}
