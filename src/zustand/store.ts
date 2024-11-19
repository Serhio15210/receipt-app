import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Meal } from "@/api/recipes/types.ts";
interface IStoreState {
  cart: Meal[];
  addToCart: (item: Meal | undefined) => void;
  removeFromCart: (id: string | undefined) => void;
  resetCart: () => void;
}
export const useStore = create<IStoreState>(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.idMeal !== id),
        })),
      resetCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
