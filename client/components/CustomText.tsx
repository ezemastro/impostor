import { View, Text, TextProps } from "react-native";
import React from "react";

export default function CustomText(props: TextProps) {
  return (
    <View>
      <Text
        {...props}
        className={"text-onBackground-primary " + props.className}
      />
    </View>
  );
}
