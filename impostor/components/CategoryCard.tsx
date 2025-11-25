import { Pressable, PressableProps } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { CrossIcon } from "./Icons";

interface CategoryCardProps extends PressableProps {
  category: CategoryInfo | SelectableCategoryInfo;
  onDelete?: () => void;
}

export default function CategoryCard({
  category,
  onDelete,
  ...props
}: CategoryCardProps) {
  return (
    <Pressable
      {...props}
      className={`
        p-4 rounded-lg border border-onBackground-accent flex-grow items-center justify-center w-1/2 flex-shrink 
        ${"selected" in category && category.selected ? "bg-app-secondary" : "bg-transparent"}
      `}
    >
      {onDelete && (
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-1 right-1 p-1 rounded-full z-10"
        >
          <CrossIcon className="text-alert" size={18} />
        </Pressable>
      )}
      <CustomText className="text-xl font-medium">{category.name}</CustomText>
    </Pressable>
  );
}
