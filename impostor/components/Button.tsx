import { PressableProps, Pressable } from "react-native";
import React from "react";

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}
export default function Button({
  className,
  children,
  ...props
}: ButtonProps & PressableProps) {
  return (
    <Pressable
      className={
        "bg-app-primary flex-row p-4 px-6 items-center justify-center rounded-lg min-h-16 min-w-80 " +
        (className || "")
      }
      {...props}
    >
      {children}
    </Pressable>
  );
}
