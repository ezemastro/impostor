import { View, Text, FlatList, TextInput } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import MainView from "@/components/MainView";
import { useCategoriesStore } from "@/stores/categories";

export default function CategoryPage() {
  const { categoryId } = useLocalSearchParams();
  // Buscar categoria de otra forma
  const categories = useCategoriesStore((state) => state.categories);
  const category = categories.find((cat) => cat.id === categoryId);

  return (
    <MainView>
      <FlatList
        data={category?.cards}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View className="p-4 bg-background-secondary">
            <Text className="text-lg">{item}</Text>
          </View>
        )}
        ListFooterComponent={<TextInput value="" />}
      />
    </MainView>
  );
}
