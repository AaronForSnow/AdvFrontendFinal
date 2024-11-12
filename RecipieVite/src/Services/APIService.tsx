import axios from "axios";
import { Ingredient } from "../Data/Ingredient";
const apiUrl: string = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    console.log("didn't get a proper env url in itemAPIService");
}
else {
    console.log("env API-url: ", apiUrl);
}

export const APIService = {
    getAll: async () => {
        const response = await axios.get(apiUrl);
        const responseIngredients: Ingredient[] = response.data;
        return responseIngredients;
    }
}