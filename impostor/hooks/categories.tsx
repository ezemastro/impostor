import { useCategoriesStore } from "@/stores/categories";

export const useGetAllCategories = (): CategoryInfo[] => {
  const fullCategories = useCategoriesStore((state) => state.categories);
  const categoriesInfo = fullCategories.map((category) => ({
    id: category.id,
    name: category.name,
  }));
  return categoriesInfo;
};
