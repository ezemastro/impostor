import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import MainView from "@/components/MainView";
import TextButton from "@/components/TextButton";
import { useGame } from "@/hooks/game";
import { useGameReset } from "@/hooks/gameReset";
import { useRouter } from "expo-router";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function FinishedGame() {
  const router = useRouter();
  const handleGameReset = useGameReset();
  const { players } = useGame();
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const regularAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
  }));
  const flippedAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value + 180}deg` }],
    opacity: opacity.value,
  }));
  return (
    <MainView>
      <View className="flex-1 justify-center p-16 gap-4">
        <View className="relative flex-grow justify-center">
          <Animated.View
            className="absolute w-full z-10"
            style={[regularAnimatedStyle, { backfaceVisibility: "hidden" }]}
          >
            <Button
              onPress={() => {
                rotation.value = withTiming(180, { duration: 500 });
              }}
              className="bg-app-secondary h-20"
            >
              <TextButton className="font-normal text-3xl">
                Revelar impostor
              </TextButton>
            </Button>
          </Animated.View>
          <Animated.View
            className="bg-background-secondary border-2 border-onBackground-accent rounded p-4"
            style={[flippedAnimatedStyle, { backfaceVisibility: "hidden" }]}
          >
            <CustomText className="text-2xl font-medium text-center">
              {players
                .filter((player) => player.isSpy)
                .map((player) => player.name)
                .join(", ") || "Nadie"}
            </CustomText>
          </Animated.View>
        </View>
        <Button
          onPress={() => {
            router.replace("/gameConfig");
          }}
          className="mt-4"
        >
          <TextButton>Nuevo juego</TextButton>
        </Button>
        <Button
          className="bg-app-secondary"
          onPress={() => {
            opacity.value = 0;
            setTimeout(() => {
              handleGameReset();
              router.replace("/game");
            }, 0);
          }}
        >
          <TextButton>Siguiente ronda</TextButton>
        </Button>
      </View>
    </MainView>
  );
}
