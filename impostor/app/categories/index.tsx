import MainView from "@/components/MainView";
import CategoryList from "@/components/CategoryList";
import { useGetAllCategories } from "@/hooks/categories";
import { useRouter } from "expo-router";

export default function CategoryListPage() {
  const router = useRouter();
  const categories = useGetAllCategories();
  const handlePress = (categoryId: string) => {
    router.push({
      pathname: "/categories/[categoryId]",
      params: { categoryId },
    });
  };
  return (
    <MainView>
      <CategoryList categories={categories} onPress={handlePress} />
    </MainView>
  );
}
