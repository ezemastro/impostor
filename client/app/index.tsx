import Button from "@/components/Button";
import MainView from "@/components/MainView";
import TextButton from "@/components/TextButton";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <MainView>
      <View className="flex-1 justify-center items-center gap-4">
        <Button
          onPress={() => {
            router.push("/gameConfig");
          }}
        >
          <TextButton>Comenzar Juego</TextButton>
        </Button>
        <Button
          onPress={() => {
            router.push("/categories");
          }}
          className="bg-app-secondary"
        >
          <TextButton>Editar categorías</TextButton>
        </Button>
      </View>
    </MainView>
  );
}
