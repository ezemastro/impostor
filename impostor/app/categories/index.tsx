import MainView from "@/components/MainView";
import CategoryList from "@/components/CategoryList";
import { useGetAllCategories } from "@/hooks/categories";
import { useRouter } from "expo-router";
import { useCategoriesStore } from "@/stores/categories";
import { randomUUID } from "expo-crypto";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function CategoryListPage() {
  const router = useRouter();
  const categories = useGetAllCategories();
  const [isConfirmingDelete, setIsConfirmingDelete] =
    useState<null | CategoryInfo>(null);

  const setCategories = useCategoriesStore((state) => state.setCategories);
  const fullCategories = useCategoriesStore((state) => state.categories);

  const handlePress = (category: CategoryInfo) => {
    router.push({
      pathname: "/categories/[categoryId]",
      params: { categoryId: category.id },
    });
  };
  const handleDelete = (category: CategoryInfo) => {
    setIsConfirmingDelete(category);
  };
  const handleConfirmDelete = () => {
    if (isConfirmingDelete) {
      setCategories(
        fullCategories.filter((cat) => cat.id !== isConfirmingDelete.id),
      );
      setIsConfirmingDelete(null);
    }
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
    <>
      <ConfirmationModal
        visible={isConfirmingDelete !== null}
        onConfirm={handleConfirmDelete}
        onClose={() => setIsConfirmingDelete(null)}
        title="Confirmar eliminación"
        description="Esta acción no se puede deshacer."
      />
      <MainView>
        <CategoryList
          categories={categories}
          onPress={handlePress}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </MainView>
    </>
  );
}
