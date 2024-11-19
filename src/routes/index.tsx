import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, useEffect } from "react";
import { debounce } from "lodash";
import Select, { SingleValue } from "react-select";
import styles from "@/styles/home.module.scss";
import RecipeCard from "@/components/recipe-card";
import ReactPaginate from "react-paginate";
import { useHomeMeals } from "@/hooks/use-home-meals.ts";
import Loader from "@/components/loader";
export const Route = createFileRoute("/")({
  component: RouteComponent,
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

  const searchByName = (e: ChangeEvent<HTMLInputElement>) => {
    setMealName(e.target.value);
  };

  useEffect(() => {
    const debouncedFn = debounce(() => setDebouncedQuery(mealName), 1500);
    debouncedRefetch();
    return () => debouncedFn.cancel();
  }, [debouncedRefetch, mealName, setDebouncedQuery]);

  const handlePageChange = (selected: { selected: number }) => {
    setPage(selected.selected);
  };
  const handleSelectChange = (
    newValue: SingleValue<{ label: string; value: string }>,
  ) => {
    setSelectFilter(newValue);
  };
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
