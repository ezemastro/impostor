import { FlatList, Pressable } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { PlusIcon } from "./Icons";

export default function CategoryList({
  categories,
  onPress,
  onDelete,
  onAdd,
}: {
  categories: (CategoryInfo | SelectableCategoryInfo)[];
  onPress: (category: CategoryInfo | SelectableCategoryInfo) => void;
  onDelete?: (category: CategoryInfo | SelectableCategoryInfo) => void;
  onAdd?: () => void;
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
          onPress={() => onPress(category)}
          onDelete={onDelete ? () => onDelete(category) : undefined}
        />
      )}
      ListFooterComponent={
        onAdd ? (
          <Pressable
            onPress={onAdd}
            className="items-center justify-center p-4 rounded-lg border border-onBackground-accent"
          >
            <PlusIcon className="text-onBackground-secondary" />
          </Pressable>
        ) : null
      }
    />
  );
}
