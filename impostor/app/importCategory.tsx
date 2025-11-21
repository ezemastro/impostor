import Button from "@/components/Button";
import MainView from "@/components/MainView";
import TextButton from "@/components/TextButton";
import { View } from "react-native";

export default function ImportCategory() {
  return (
    <MainView>
      <View className="flex-1 justify-center items-center gap-4">
        <Button onPress={() => {}}>
          <TextButton>Comenzar Juego</TextButton>
        </Button>
        <Button onPress={() => {}}>
          <TextButton>Probar</TextButton>
        </Button>
      </View>
    </MainView>
  );
}
