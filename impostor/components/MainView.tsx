import { View } from "react-native";
import React from "react";

export default function MainView({ children }: { children: React.ReactNode }) {
  return <View className="bg-background-primary flex-1">{children}</View>;
}
