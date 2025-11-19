import { FlatList, Pressable, View } from "react-native";
import Section from "../Section";
import CustomText from "../CustomText";
import { useCurrentGameStore } from "@/stores/currentGame";
import CategoryCard from "../CategoryCard";
import { PlusIcon } from "../Icons";
import CategoriesSelectionModal from "./CategoriesSelectionModal";
import { useState } from "react";

export default function CategoriesSection() {
  const selectedCategories = useCurrentGameStore((state) => state.categories);
  const setSelectedCategories = useCurrentGameStore(
    (state) => state.setCategories,
  );
  const [isCategorySelectionModalVisible, setIsCategorySelectionModalVisible] =
    useState(false);
  return (
    <>
      <CategoriesSelectionModal
        visible={isCategorySelectionModalVisible}
        onSubmit={(selectedCategories) => {
          setSelectedCategories(selectedCategories);
          setIsCategorySelectionModalVisible(false);
        }}
        onClose={() => setIsCategorySelectionModalVisible(false)}
      />
      <Section>
        <View className="flex-row justify-between">
          <CustomText className="text-2xl font-medium">Categorías:</CustomText>
        </View>
        <FlatList
          data={selectedCategories}
          keyExtractor={(item) => item.id}
          // TODO - Agregar botón para eliminar una categoría
          renderItem={({ item: category }) => (
            <CategoryCard category={{ ...category, selected: true }} />
          )}
          contentContainerClassName="gap-2"
          ItemSeparatorComponent={() => <View className="h-2" />}
          numColumns={2}
          columnWrapperClassName="gap-2"
          scrollEnabled={false}
          ListFooterComponent={
            <Pressable
              onPress={() => setIsCategorySelectionModalVisible(true)}
              className="border-2 border-onBackground-accent rounded-lg items-center justify-center p-2 mt-2"
            >
              <PlusIcon className="text-onBackground-primary" />
            </Pressable>
          }
        />
      </Section>
    </>
  );
}
