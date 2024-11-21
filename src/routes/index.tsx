import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, useEffect } from "react";
import { debounce } from "lodash";
import Select, { SingleValue } from "react-select";
import styles from "@/styles/home.module.scss";
import RecipeCard from "@/components/recipe-card";
import ReactPaginate from "react-paginate";
import { useHomeMeals } from "@/hooks/use-home-meals.ts";
import Loader from "@/components/loader";
type ItemFilters = {
  page: number;
  filter: string;
};
export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search: { page?: number; filter?: string }): ItemFilters => {
    return {
      page: search.page || 1,
      filter: search.filter || "",
    };
  },
});

function RouteComponent() {
  const {
    mealName,
    setMealName,
    debouncedRefetch,
    setDebouncedQuery,
    setPage,
    selectFilter,
    setSelectFilter,
    filterCategories,
    paginatedData,
    totalPages,
    isLoading,
  } = useHomeMeals();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const goToPage = (page: number) => {
    navigate({
      search: (prev: ItemFilters) => ({
        ...prev,
        page: page,
      }),
      replace: true,
    });
  };
  const goToFilter = (filter: string) => {
    navigate({
      search: (prev: ItemFilters) => ({
        ...prev,
        filter: filter,
      }),
      replace: true,
    });
  };
  const searchByName = (e: ChangeEvent<HTMLInputElement>) => {
    setMealName(e.target.value);
  };
  const handlePageChange = (selected: { selected: number }) => {
    setPage(selected.selected);
    goToPage(selected.selected + 1);
  };
  const handleSelectChange = (
    newValue: SingleValue<{ label: string; value: string }>,
  ) => {
    setSelectFilter(newValue);
    goToFilter(newValue?.value || "");
  };
  useEffect(() => {
    const debouncedFn = debounce(() => setDebouncedQuery(mealName), 1000);
    debouncedRefetch();
    return () => debouncedFn.cancel();
  }, [debouncedRefetch, mealName, setDebouncedQuery]);
  useEffect(() => {
    setPage(search.page ? search.page - 1 : 0);
    setSelectFilter(
      search?.filter
        ? {
            label: search?.filter,
            value: search?.filter,
          }
        : null,
    );
  }, []);

  return (
    <div className={"container"}>
      <div className={styles.searchContainer}>
        <div className={styles.row}>
          <h1>Search</h1>
          <div className={styles.inputBlock}>
            <input
              value={mealName}
              onChange={searchByName}
              placeholder={"Search..."}
            />
            <img src={"/find.svg"} alt="find" />
          </div>
        </div>

        <div className={styles.row}>
          <h1>Category</h1>
          <Select
            isClearable
            value={selectFilter}
            placeholder={"Select category..."}
            onChange={handleSelectChange}
            options={filterCategories}
          />
        </div>
      </div>
      <div style={{ position: "relative" }}></div>
      {isLoading ? (
        <Loader />
      ) : paginatedData.length > 0 ? (
        <>
          <div className={styles.recipesContainer}>
            {paginatedData.map((item) => (
              <RecipeCard card={item} key={item.idMeal} />
            ))}
          </div>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            disabledClassName={styles.disabled}
          />
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}
