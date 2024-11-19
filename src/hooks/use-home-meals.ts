import {
  useGetCategories,
  useSearchMeal,
} from "@/api/recipes/queries/queries.ts";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import { SingleValue } from "react-select";

export const useHomeMeals = () => {
  const pageLimit = 20;
  const [mealName, setMealName] = useState("");
  const [page, setPage] = useState(0);
  const [selectFilter, setSelectFilter] =
    useState<SingleValue<{ label: string; value: string }>>(null);

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data, refetch, isLoading, isRefetching } = useSearchMeal(
    mealName,
    debouncedQuery,
  );

  const { data: categories } = useGetCategories();
  const filterCategories = categories?.meals.map((item) => ({
    label: item.strCategory,
    value: item.strCategory,
  }));

  const filterData = useMemo(() => {
    if (!data?.meals) return [];
    return selectFilter?.value
      ? data.meals.filter((item) =>
          item.strCategory.includes(selectFilter?.value as string),
        )
      : data.meals;
  }, [data, selectFilter]);

  const paginatedData = useMemo(() => {
    if (!filterData) return [];
    const startIndex = page * pageLimit; // Начало для текущей страницы
    const endIndex = startIndex + pageLimit; // Конец для текущей страницы
    return filterData.slice(startIndex, endIndex); // Срез данных
  }, [filterData, page, pageLimit]);

  const totalPages = useMemo(() => {
    return filterData ? Math.ceil(filterData.length / pageLimit) : 0;
  }, [filterData, pageLimit]);

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 1000),
    [refetch],
  );

  return {
    mealName,
    setMealName,
    selectFilter,
    setSelectFilter,
    paginatedData,
    filterCategories,
    totalPages,
    debouncedRefetch,
    setPage,
    isLoading,
    isRefetching,
    setDebouncedQuery,
  };
};
