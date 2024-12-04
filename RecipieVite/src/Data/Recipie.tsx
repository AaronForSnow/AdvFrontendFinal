import { RecipieIngredient } from "./RecipieIngredient";

export interface Recipie {
    id: number,
    recipie_name: string,
    description: string,
    instructions: string,
    ingredients: RecipieIngredient[]
}