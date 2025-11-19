import { Pressable } from "react-native";
import React from "react";
import { ConfigIcon } from "./Icons";

export default function ConfigButton() {
  return (
    <Pressable>
      <ConfigIcon className="text-onBackground-primary" />
    </Pressable>
  );
}
