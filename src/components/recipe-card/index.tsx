import React from "react";
import styles from "./recipeCard.module.scss";
import { Meal } from "@/api/recipes/types.ts";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/zustand/store.ts";

interface IRecipeCard {
  card: Meal;
}
const RecipeCard = ({ card }: IRecipeCard) => {
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const cart = useStore((state) => state.cart);
  const isAdded = cart.find((item) => item.idMeal === card?.idMeal);
  const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAdded) {
      removeFromCart(card?.idMeal);
    } else addToCart(card);
  };
  return (
    <Link to={`/recipe/${card.idMeal}`}>
      <div className={styles.card}>
        <img src={card.strMealThumb} alt={""} draggable={false} />
        <div className={styles.content}>
          <div className={styles.column}>
            <h3>{card.strMeal}</h3>
            <div className={styles.row}>
              <p>Category:</p>
              <span>{card.strCategory}</span>
            </div>
            <div className={styles.row}>
              <p>Area:</p>
              <span>{card.strArea}</span>
            </div>
            <p>Instructions:</p>
            <div className={styles.desc}>{card.strInstructions}</div>
          </div>
          <button onClick={toggleCart}>
            {isAdded ? "Remove from cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
