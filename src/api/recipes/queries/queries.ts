import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryIds } from "@/api/recipes/queries/constants.ts";
import {
  getMealById,
  getMealCategories,
  searchMeal,
} from "@/api/recipes/actions.ts";
import { IMealResponse, Meal, MealCategory } from "@/api/recipes/types.ts";

export const useSearchMeal = (
  name: string,
  debouncedQuery: string,
): UseQueryResult<IMealResponse<Meal>, Error> => {
  return useQuery({
    queryKey: [queryIds.SEARCH_MEAL, name],
    queryFn: () => searchMeal(name),
    enabled: !!debouncedQuery,
    initialData: { meals: [] },
    placeholderData: { meals: [] },
    select: (data) => {
      return { meals: data?.meals };
    },
  });
};

export const useGetCategories = (): UseQueryResult<
  IMealResponse<MealCategory>,
  Error
> => {
  return useQuery({
    queryKey: [queryIds.MEAL_CATEGORIES],
    queryFn: getMealCategories,
  });
};
export const useGetMealById = (
  id: string,
): UseQueryResult<IMealResponse<Meal>, Error> => {
  return useQuery({
    queryKey: [queryIds.MEAL],
    queryFn: () => getMealById(id),
    initialData: { meals: [] },
    placeholderData: { meals: [] },
    select: (data) => {
      return { meals: data?.meals };
    },
  });
};
