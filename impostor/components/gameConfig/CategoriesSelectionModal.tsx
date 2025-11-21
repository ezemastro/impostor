import { useGetAllCategories } from "@/hooks/categories";
import { useState } from "react";
import { Modal, ModalProps, Pressable, View } from "react-native";
import Title from "../Title";
import CategoryList from "../CategoryList";
import Button from "../Button";
import TextButton from "../TextButton";
import { CrossIcon } from "../Icons";

interface Props extends ModalProps {
  onSubmit: (selectedCategories: CategoryInfo[]) => void;
  onClose: () => void;
}
export default function CategoriesSelectionModal({
  onSubmit,
  onClose,
  ...props
}: Props) {
  const categories = useGetAllCategories();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const onToggle = (categoryId: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <Modal backdropColor={"transparent"} onRequestClose={onClose} {...props}>
      <View className="flex-1 bg-background-primary rounded-lg mx-4 my-20 p-4 py-8 gap-4">
        <Pressable className="absolute right-3 top-3 p-2" onPress={onClose}>
          <CrossIcon className="text-onBackground-primary" />
        </Pressable>
        <Title className="text-center">Seleccione categorías</Title>
        <CategoryList
          categories={categories.map((category) => ({
            ...category,
            selected: selectedCategoryIds.includes(category.id),
          }))}
          onPress={onToggle}
        />
        <Button
          onPress={() =>
            onSubmit(
              categories.filter((category) =>
                selectedCategoryIds.includes(category.id),
              ),
            )
          }
        >
          <TextButton className="text-2xl">Confirmar</TextButton>
        </Button>
      </View>
    </Modal>
  );
}
