import { createFileRoute } from "@tanstack/react-router";
import styles from "@/styles/cart.module.scss";
import { useStore } from "@/zustand/store.ts";
export const Route = createFileRoute("/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const resetCart = useStore((state) => state.resetCart);
  const array = Array.from({ length: 20 }, (_, index) => index + 1);
  const groupedIngredients = cart.map((recipe) => {
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

    return {
      name: recipe.strMeal,
      ingredients,
    };
  });
  const groupedInstructions = cart.map((recipe) => {
    return { name: recipe.strMeal, instruction: recipe.strInstructions };
  });
  const handleReset = () => {
    const confirmReset = window.confirm("Are you sure to reset your cart?");
    if (confirmReset) {
      resetCart();
    }
  };
  return (
    <div className="container">
      {cart.length ? (
        <>
          <div className={styles.cartContainer}>
            <div className={styles.recipes}>
              {cart.map((item) => {
                return (
                  <div className={styles.recipeCard}>
                    <img src={item.strMealThumb} alt="recipe" />
                    <p>{item.strMeal}</p>
                    <div className={styles.hoverCard}>
                      <button onClick={() => removeFromCart(item.idMeal)}>
                        Remove from cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.ingredientsContainer}>
              <h2>Ingredients:</h2>
              <div className={styles.ingredients}>
                {groupedIngredients.map((recipe, index) => (
                  <div key={index}>
                    <h3>Recipe {recipe.name}</h3>
                    <ul>
                      {recipe.ingredients.map(
                        ([ingredient, measure], index) => (
                          <li key={index}>
                            {ingredient} - {measure}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.instructionContainer}>
            <h2>Instructions:</h2>
            {groupedInstructions.map((recipe, index) => (
              <div key={index}>
                <h3>Recipe {recipe.name}</h3>
                <p>{recipe.instruction}</p>
              </div>
            ))}
          </div>
          {cart.length && (
            <button style={{ width: "100%" }} onClick={handleReset}>
              Reset cart
            </button>
          )}
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}
