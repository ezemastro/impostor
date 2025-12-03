import {
  View,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import MainView from "@/components/MainView";
import { useCategoriesStore } from "@/stores/categories";
import CustomText from "@/components/CustomText";
import { CrossIcon, PlusIcon } from "@/components/Icons";
import { COLORS } from "@/constants/colors";
import Button from "@/components/Button";
import TextButton from "@/components/TextButton";

export default function CategoryPage() {
  const { categoryId } = useLocalSearchParams();
  // Buscar categoria de otra forma
  const categories = useCategoriesStore((state) => state.categories);
  const category = categories.find((cat) => cat.id === categoryId);

  const setCategories = useCategoriesStore((state) => state.setCategories);
  const [editing, setEditing] = useState({ index: -1, text: "" });
  const [multipleText, setMultipleText] = useState("");
  const handleModifyCard = (oldText: string) => {
    if (!category) return;
    const updatedCards = category.cards.map((card) =>
      card === oldText ? editing.text : card,
    );
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, cards: updatedCards } : cat,
      ),
    );
  };
  const handleAddCard = () => {
    if (!category) return;
    const updatedCards = [...category.cards, ""];
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, cards: updatedCards } : cat,
      ),
    );
  };
  const handleDeleteCard = (index: number) => {
    if (!category) return;
    const updatedCards = category.cards.filter((_, i) => i !== index);
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, cards: updatedCards } : cat,
      ),
    );
  };
  const handleModifyTitle = (text: string) => {
    if (!category) return;
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, name: text } : cat,
      ),
    );
  };
  const handleAddMultipleCards = () => {
    if (!category) return;
    const newCards = multipleText
      .split(/[\n,]+/)
      .map((card) => card.trim())
      .filter((card) => card.length > 0);
    const updatedCards = [...category.cards, ...newCards];
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, cards: updatedCards } : cat,
      ),
    );
    setMultipleText("");
  };

  return (
    <MainView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <FlatList
          data={category?.cards}
          keyExtractor={(item, index) => item + index}
          contentContainerClassName="p-4 gap-2 pb-16"
          renderItem={({ item, index }) => (
            <View className="px-4 py-1 bg-background-secondary rounded border border-onBackground-accent flex-row items-center">
              <TextInput
                className="text-lg text-onBackground-primary flex-grow"
                value={editing.index === index ? editing.text : item}
                onChangeText={(text) => setEditing({ index, text })}
                onEndEditing={() => {
                  handleModifyCard(item);
                }}
              />
              <Pressable onPress={() => handleDeleteCard(index)}>
                <CrossIcon className="text-alert" />
              </Pressable>
            </View>
          )}
          ListHeaderComponent={
            <TextInput
              value={category?.name}
              className="text-3xl text-onBackground-primary text-center font-medium"
              onChangeText={handleModifyTitle}
            />
          }
          ListFooterComponent={
            <>
              <Pressable
                className="p-2 bg-background-secondary rounded border border-onBackground-accent justify-center items-center"
                onPress={handleAddCard}
              >
                <PlusIcon className="text-onBackground-secondary mr-2" />
              </Pressable>
              <View className="mt-8">
                <CustomText className="text-2xl">Importar palabras:</CustomText>
                <CustomText className="text-onBackground-secondary">
                  Agrega palabras rápidamente escribiéndolas separadas por comas
                  o por saltos de línea.
                </CustomText>
                <TextInput
                  multiline
                  numberOfLines={12}
                  className="bg-background-secondary rounded border border-onBackground-accent text-onBackground-primary p-2 text-md min-h-36 mt-4"
                  textAlignVertical="top"
                  placeholderTextColor={COLORS.onBackground.accent}
                  placeholder="Palabra 1, Palabra 2, Palabra 3..."
                  value={multipleText}
                  onChangeText={setMultipleText}
                />
                <Button
                  onPress={handleAddMultipleCards}
                  className={
                    "bg-app-secondary mt-2 min-h-0 py-3 justify-center items-center " +
                    (multipleText.trim().length === 0 ? "opacity-50" : "")
                  }
                  disabled={multipleText.trim().length === 0}
                >
                  <TextButton className="text-lg text-onBackground-secondary">
                    Agregar palabras
                  </TextButton>
                </Button>
              </View>
            </>
          }
        />
      </KeyboardAvoidingView>
    </MainView>
  );
}
