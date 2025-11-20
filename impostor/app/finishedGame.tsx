import Button from "@/components/Button";
import MainView from "@/components/MainView";
import TextButton from "@/components/TextButton";
import { useGameReset } from "@/hooks/useGameReset";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function FinishedGame() {
  const router = useRouter();
  const handleGameReset = useGameReset();
  return (
    <MainView>
      <View className="flex-1 justify-center items-center gap-4">
        <Button
          onPress={() => {
            router.push("/gameConfig");
          }}
        >
          <TextButton>Nuevo juego</TextButton>
        </Button>
        <Button
          onPress={() => {
            handleGameReset();
            router.push("/game");
          }}
        >
          <TextButton>Siguiente ronda</TextButton>
        </Button>
      </View>
    </MainView>
  );
}
