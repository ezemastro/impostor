import { Pressable } from "react-native";
import React from "react";
import { ConfigIcon } from "./Icons";
import { useRouter } from "expo-router";

export default function ConfigButton() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push("/config")} className="p-2">
      <ConfigIcon className="text-onBackground-primary" />
    </Pressable>
  );
}
