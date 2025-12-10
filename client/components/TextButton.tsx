import { Text, TextProps } from "react-native";
import React from "react";

export default function TextButton(props: TextProps) {
  return (
    <Text
      {...props}
      className={
        "text-white text-3xl font-semibold text-center " +
        (props.className || "")
      }
    >
      {props.children}
    </Text>
  );
}
