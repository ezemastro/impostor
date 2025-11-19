import { Pressable, PressableProps } from "react-native";
import React from "react";
import CustomText from "./CustomText";

interface CategoryCardProps extends PressableProps {
  category: SelectableCategoryInfo;
}

export default function CategoryCard({
  category,
  ...props
}: CategoryCardProps) {
  return (
    <Pressable
      {...props}
      className={`
        p-4 rounded-lg border border-onBackground-accent flex-grow items-center justify-center w-1/2 flex-shrink 
        ${category.selected ? "bg-app-secondary" : "bg-transparent"}
      `}
    >
      <CustomText className="text-xl font-medium">{category.name}</CustomText>
    </Pressable>
  );
}
