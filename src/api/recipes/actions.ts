import { api } from "@/api/api.ts";
import { IMealResponse, Meal, MealCategory } from "@/api/recipes/types.ts";

export const searchMeal = async (name: string) => {
  const response = await api.post<IMealResponse<Meal>>(`/search.php?s=${name}`);
  return response.data;
};
export const getMealCategories = async () => {
  const response =
    await api.post<IMealResponse<MealCategory>>(`/list.php?c=list`);
  return response.data;
};
export const getMealById = async (id: string) => {
  const response = await api.post<IMealResponse<Meal>>(`/lookup.php?i=${id}`);
  return response.data;
};
