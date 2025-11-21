import { FlatList } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

export default function CategoryList({
  categories,
  onPress,
}: {
  categories: (CategoryInfo | SelectableCategoryInfo)[];
  onPress: (categoryId: string) => void;
}) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerClassName="gap-2 p-4"
      numColumns={2}
      columnWrapperClassName="gap-2"
      renderItem={({ item: category }) => (
        <CategoryCard
          category={category}
          onPress={() => onPress(category.id)}
        />
      )}
    />
  );
}
