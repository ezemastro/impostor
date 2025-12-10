import { View } from "react-native";
import React from "react";

export default function MainView({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 bg-background-primary items-center">
      <View className="bg-background-primary flex-1 max-w-2xl">{children}</View>
    </View>
  );
}
