import { createFileRoute } from "@tanstack/react-router";
import { useGetMealById } from "@/api/recipes/queries/queries.ts";
import styles from "@/styles/recipe.module.scss";
import Loader from "@/components/loader";
import { useStore } from "@/zustand/store.ts";
import React from "react";

export const Route = createFileRoute("/recipe/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isLoading } = useGetMealById(id);
  const recipe = data?.meals[0];
  const array = Array.from({ length: 20 }, (_, index) => index);
  const ingredients = array
    .map((item) => {
      return recipe
        ? [recipe[`strIngredient${item}`], recipe[`strMeasure${item}`]]
        : [];
    })
    .filter((subArray) =>
      subArray.every(
        (item) => item !== null && item !== "" && item !== undefined,
      ),
    );
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const cart = useStore((state) => state.cart);
  const isAdded = cart.find((item) => item.idMeal === recipe?.idMeal);
  const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAdded) {
      removeFromCart(recipe?.idMeal);
    } else addToCart(recipe);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className={"container"}>
      <div className={styles.recipeContainer}>
        <div className={styles.info}>
          <img alt={"recipe"} src={recipe?.strMealThumb} />
          <div className={styles.content}>
            <div className={styles.row}>
              <h3>Name:</h3>
              <span>{recipe?.strMeal}</span>
            </div>
            <div className={styles.row}>
              <h3>Category:</h3>
              <span>{recipe?.strCategory}</span>
            </div>
            <div className={styles.row}>
              <h3>Area:</h3>
              <span>{recipe?.strArea}</span>
            </div>
            <div className={styles.ingredients}>
              <h3>Ingredients:</h3>
              {ingredients.map((item, index) => {
                return (
                  <ul className={styles.row} key={index}>
                    <li>
                      {item[0]} - {item[1]}
                    </li>
                  </ul>
                );
              })}
            </div>
            <h3>Instructions:</h3>
            <span>{recipe?.strInstructions}</span>
          </div>
          <button onClick={toggleCart}>
            {isAdded ? "Remove from cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
