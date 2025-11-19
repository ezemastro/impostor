import MainView from "@/components/MainView";
import Button from "@/components/Button";
import TextButton from "@/components/TextButton";
import CategoryList from "@/components/CategoryList";
import { View } from "react-native";
import { useGetAllCategories } from "@/hooks/categories";
import { useCurrentGameStore } from "@/stores/currentGame";
import { Stack } from "expo-router";
import Title from "@/components/Title";

export default function CategorySelection() {
  const categories = useGetAllCategories();
  const selectedCategories = useCurrentGameStore((state) => state.categories);
  const setSelectedCategories = useCurrentGameStore(
    (state) => state.setCategories,
  );

  const handleToggleCategory = (categoryId: string) => {
    const updatedCategories = selectedCategories.some(
      (cat) => cat.id === categoryId,
    )
      ? selectedCategories.filter((cat) => cat.id !== categoryId)
      : [
          ...selectedCategories,
          categories.find((cat) => cat.id === categoryId)!,
        ];
    setSelectedCategories(updatedCategories);
  };

  const handleSubmit = () => {
    // Navegar a la siguiente pantalla o iniciar el juego
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "" }} />
      <MainView>
        <View className="p-4">
          <Title className="text-2xl font-bold mb-4 text-center">
            Seleccione las categorías
          </Title>
        </View>
        <CategoryList
          categories={categories.map((category) => ({
            ...category,
            selected: selectedCategories.some((cat) => cat.id === category.id),
          }))}
          onToggle={handleToggleCategory}
        />
        <View className="p-4 absolute bottom-10 w-full">
          <Button onPress={handleSubmit}>
            <TextButton>Iniciar Juego</TextButton>
          </Button>
        </View>
      </MainView>
    </>
  );
}
