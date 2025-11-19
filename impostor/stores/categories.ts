import { INITIAL_CATEGORIES } from "@/constants/categories";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CategoriesStoreType {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useCategoriesStore = create<CategoriesStoreType>()(
  persist(
    (set) => ({
      categories: INITIAL_CATEGORIES,
      setCategories: (categories: Category[]) => set(() => ({ categories })),
    }),
    {
      name: "categories-store",
    },
  ),
);
