import MainView from "@/components/MainView";
import { useGame } from "@/hooks/game";
import { useCallback, useState } from "react";
import { Dimensions, StyleProp, View, ViewStyle } from "react-native";
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
export default function Game() {
  const { currentCard, players } = useGame();
  const [index, setIndex] = useState(0);

  const handleNextCard = useCallback(() => {
    setIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= players.length) {
        return 0; // or reset to 0 if you want to loop
      }
      return nextIndex;
    });
  }, [players.length]);

  const translationX = useSharedValue(0);
  const isAnimating = useSharedValue(false);
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
            if (finished) {
              translationX.value = 0;
              scheduleOnRN(handleNextCard);
            }
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
              <Card
                player={player}
                key={player.id}
                index={i}
                animatedStyle={i === 0 ? frontCardStyle : undefined}
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
}
const Card = ({ player, index, animatedStyle }: CardProps) => {
  const rotation = useSharedValue(0);
  const isRotating = useSharedValue(false);
  const TapGesture = Gesture.Tap().onStart(() => {
    if (isRotating.value) return;
    isRotating.value = true;
    rotation.value = withTiming(rotation.value + 180, { duration: 200 }, () => {
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
  return (
    <GestureDetector gesture={TapGesture}>
      <View className="absolute w-80 h-1/2" style={{ zIndex: 10 - index }}>
        <Animated.View
          className="absolute w-full h-full items-center justify-center bg-background-secondary rounded-lg"
          style={[animatedStyle, regularAnimatedStyle]}
        >
          <CustomText>{player.name}</CustomText>
        </Animated.View>
        <Animated.View
          className="absolute w-full h-full items-center justify-center bg-background-secondary rounded-lg"
          style={[animatedStyle, flippedAnimatedStyle]}
        >
          <CustomText>{"la otra parte"}</CustomText>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};
