import MainView from "@/components/MainView";
import CategoryList from "@/components/CategoryList";
import { useGetAllCategories } from "@/hooks/categories";
import { useRouter } from "expo-router";
import { useCategoriesStore } from "@/stores/categories";
import { randomUUID } from "expo-crypto";

export default function CategoryListPage() {
  const router = useRouter();
  const categories = useGetAllCategories();

  const setCategories = useCategoriesStore((state) => state.setCategories);
  const fullCategories = useCategoriesStore((state) => state.categories);

  const handlePress = (category: CategoryInfo) => {
    router.push({
      pathname: "/categories/[categoryId]",
      params: { categoryId: category.id },
    });
  };
  const handleDelete = (category: CategoryInfo) => {
    setCategories(fullCategories.filter((cat) => cat.id !== category.id));
  };
  const handleAdd = () => {
    const newCategory: Category = {
      id: randomUUID(),
      name: "Nueva Categoría",
      cards: ["Palabra 1", "Palabra 2"],
    };
    setCategories([...fullCategories, newCategory]);
    router.push({
      pathname: "/categories/[categoryId]",
      params: { categoryId: newCategory.id },
    });
  };
  return (
    <MainView>
      <CategoryList
        categories={categories}
        onPress={handlePress}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </MainView>
  );
}
