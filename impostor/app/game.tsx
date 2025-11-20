import MainView from "@/components/MainView";
import { useGame } from "@/hooks/game";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  AnimatedProps,
  AnimatedStyle,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
export default function Game() {
  const router = useRouter();
  const { currentCard, players } = useGame();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [players.length, currentCard]);

  const handleNextCard = useCallback(() => {
    setIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= players.length) {
        router.replace("/finishedGame");
        return 0;
      }
      return nextIndex;
    });
  }, [players.length, router]);
  const [swiped, setSwiped] = useState(false);
  useEffect(() => {
    if (swiped) {
      handleNextCard(); // cambia index
      translationX.value = 0; // se resetea **antes** del render
      setSwiped(false);
    }
  }, [swiped]);

  const translationX = useSharedValue(0);
  const SlideGesture = Gesture.Pan()
    .onChange((e) => {
      translationX.value = e.translationX;
    })
    .onEnd((e) => {
      if (Math.abs(translationX.value) > SWIPE_THRESHOLD) {
        const isRightSwipe = translationX.value > 0;
        translationX.value = withSpring(
          isRightSwipe ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 200 },
          (finished) => {
            scheduleOnRN(setSwiped, true);
          },
        );
      } else {
        translationX.value = withSpring(0);
      }
    });

  const frontCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
        {
          rotate: `${interpolate(
            translationX.value,
            [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            [-15, 0, 15],
          )}deg`,
        },
        {
          translateY: interpolate(
            translationX.value,
            [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            [10, 0, 10],
          ),
        },
      ],
    };
  });
  return (
    <MainView>
      <GestureHandlerRootView>
        <GestureDetector gesture={SlideGesture}>
          <View className="items-center justify-center flex-1">
            {players.slice(index, index + 3).map((player, i) => (
              <AnimatedCard
                player={player}
                currentCard={currentCard!}
                key={player.id}
                index={i}
                animatedStyle={i === 0 ? frontCardStyle : undefined}
                swiped={swiped}
              />
            ))}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </MainView>
  );
}

interface CardProps {
  player: Player & { isSpy: boolean };
  index: number;
  animatedStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  swiped: boolean;
  currentCard: Card;
}
const AnimatedCard = ({
  player,
  index,
  animatedStyle,
  swiped,
  currentCard,
}: CardProps) => {
  const rotation = useSharedValue(0);
  const isRotating = useSharedValue(false);
  const TapGesture = Gesture.Tap().onStart(() => {
    if (isRotating.value) return;
    isRotating.value = true;
    rotation.value = withTiming(rotation.value + 180, { duration: 300 }, () => {
      isRotating.value = false;
    });
  });
  const regularAnimatedStyle = useAnimatedStyle(() => {
    const isFront = rotation.value % 360 === 0;
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
      backfaceVisibility: "hidden",
      zIndex: isFront ? 2 : 1,
    };
  });
  const flippedAnimatedStyle = useAnimatedStyle(() => {
    const isFront = (rotation.value + 180) % 360 === 0;
    return {
      transform: [{ rotateY: `${rotation.value + 180}deg` }],
      backfaceVisibility: "hidden",
      zIndex: isFront ? 2 : 1,
    };
  });
  useEffect(() => {
    if (swiped) {
      rotation.value = 0;
    }
  }, [swiped]);
  return (
    <GestureDetector gesture={TapGesture}>
      <View className="absolute w-80 h-1/2" style={{ zIndex: 10 - index }}>
        <Animated.View
          className="absolute w-full h-full bg-background-secondary rounded-lg border-4 border-onBackground-accent"
          style={[animatedStyle, regularAnimatedStyle]}
        >
          <ImageBackground
            source={require("@/assets/images/impostor_icon_small_pattern.png")}
            className="items-center justify-center w-full h-full"
            resizeMode="repeat"
            imageClassName="rounded-lg"
          >
            <CustomText className="font-medium text-3xl text-center text-onBackground-accent">
              {player.name}
            </CustomText>
          </ImageBackground>
        </Animated.View>
        <Animated.View
          className="absolute w-full h-full items-center justify-center bg-background-secondary rounded-lg border-4 border-onBackground-accent"
          style={[animatedStyle, flippedAnimatedStyle]}
        >
          <CustomText className="font-medium text-3xl text-center text-onBackground-secondary">
            {player.isSpy ? "Eres el impostor!" : currentCard}
          </CustomText>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};
