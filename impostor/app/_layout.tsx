import { Stack } from "expo-router";
import "../global.css";
import { COLORS } from "@/constants/colors";
import ConfigButton from "@/components/ConfigButton";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background.primary },
        headerShadowVisible: false,
        headerTitleStyle: { color: COLORS.onBackground.primary },
        headerTintColor: COLORS.onBackground.primary,
        headerTitleAlign: "center",
        headerRight: () => <ConfigButton />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Impostor" }} />
      <Stack.Screen
        name="gameConfig"
        options={{ title: "Configuración del Juego" }}
      />
    </Stack>
  );
}
