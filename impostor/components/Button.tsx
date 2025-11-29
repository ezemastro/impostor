import { PressableProps, Pressable } from "react-native";
import { twMerge } from "tailwind-merge";
import React from "react";

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}
export default function Button({
  className,
  children,
  disabled,
  ...props
}: ButtonProps & PressableProps) {
  return (
    <Pressable
      className={twMerge(
        "bg-app-primary flex-row p-4 px-6 items-center justify-center rounded-lg min-h-16 min-w-80 " +
          (disabled ? "opacity-50" : "opacity-100 ") +
          (className || ""),
      )}
      {...props}
    >
      {children}
    </Pressable>
  );
}
