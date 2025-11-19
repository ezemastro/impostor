import { View, type ViewProps } from "react-native";
import React from "react";

interface SectionProps extends ViewProps {
  children: React.ReactNode;
}
export default function Section({
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <View
      {...props}
      className={"bg-app-tertiary p-4 rounded-lg gap-4 " + (className ?? "")}
    >
      {children}
    </View>
  );
}
