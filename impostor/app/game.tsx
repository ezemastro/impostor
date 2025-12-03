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
  AnimatedStyle,
  interpolate,
  SharedValue,
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
import { SPECIAL_ROUNDS } from "@/constants/specialRounds";
import { useRandomCard } from "@/hooks/randomCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
export default function Game() {
  const router = useRouter();
  const { currentCard, players, currentSpecialRound } = useGame();
  const { getRandomCard } = useRandomCard();
  const [index, setIndex] = useState(0);
  console.log(currentSpecialRound);

  useEffect(() => {
    setIndex(0);
  }, [players.length, currentCard]);

  const translationX = useSharedValue(0);
  const rotation = useSharedValue(0);

  const handleNextCard = useCallback(() => {
    translationX.value = 0;
    rotation.value = 0;
    const nextIndex = index + 1;
    if (nextIndex >= players.length) {
      router.replace("/finishedGame");
      return;
    }
    setIndex(nextIndex);
  }, [players.length, router, translationX, rotation, index]);

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
          () => {
            scheduleOnRN(handleNextCard);
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
            [
              -SCREEN_WIDTH / 2,
              -SWIPE_THRESHOLD,
              0,
              SWIPE_THRESHOLD,
              SCREEN_WIDTH / 2,
            ],
            [-15, -15, 0, 15, 15],
          )}deg`,
        },
      ],
    };
  });
  return (
    <MainView>
      <GestureHandlerRootView>
        <GestureDetector gesture={SlideGesture}>
          <View className="items-center justify-center flex-1 mb-24">
            {players.slice(index, index + 3).map((player, i) => (
              <AnimatedCard
                player={player}
                currentCard={
                  currentSpecialRound === SPECIAL_ROUNDS.RANDOM_CARDS
                    ? getRandomCard()!
                    : currentCard!
                }
                key={player.id}
                index={i}
                animatedStyle={i === 0 ? frontCardStyle : undefined}
                rotation={rotation}
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
  currentCard: Card;
  rotation: SharedValue<number>;
}
const AnimatedCard = ({
  player,
  index,
  animatedStyle,
  currentCard,
  rotation,
}: CardProps) => {
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
      transform: [
        {
          rotateY: `${rotation.value}deg`,
        },
        {
          scale: interpolate(
            rotation.value % 360,
            [0, 90, 180, 270, 360],
            [1, 1.2, 1, 1.2, 1],
          ),
        },
      ],
      zIndex: isFront ? 2 : 1,
    };
  });
  const flippedAnimatedStyle = useAnimatedStyle(() => {
    const isFront = (rotation.value + 180) % 360 === 0;
    return {
      transform: [
        { rotateY: `${rotation.value + 180}deg` },
        {
          scale: interpolate(
            rotation.value % 360,
            [0, 90, 180, 270, 360],
            [1, 1.2, 1, 1.2, 1],
          ),
        },
      ],
      zIndex: isFront ? 2 : 1,
    };
  });
  return (
    <GestureDetector gesture={TapGesture}>
      <View className="absolute w-96 h-2/3" style={{ zIndex: 10 - index }}>
        <Animated.View
          className="absolute w-full h-full bg-background-secondary rounded-lg border-4 border-onBackground-accent"
          style={[
            index === 0 ? [animatedStyle, regularAnimatedStyle] : undefined,
            { backfaceVisibility: "hidden" },
          ]}
        >
          <ImageBackground
            source={require("@/assets/images/impostor_icon_small_pattern.png")}
            className="items-center justify-center w-full h-full"
            resizeMode="repeat"
            imageClassName="rounded-lg"
          >
            <CustomText className="font-medium text-3xl text-center text-onBackground-secondary">
              {player.name}
            </CustomText>
          </ImageBackground>
        </Animated.View>
        {index === 0 && (
          <Animated.View
            className="absolute w-full h-full items-center justify-center bg-background-secondary rounded-lg border-4 border-onBackground-accent"
            style={[
              animatedStyle,
              flippedAnimatedStyle,
              { backfaceVisibility: "hidden" },
            ]}
          >
            <CustomText
              className={
                "font-medium text-3xl text-center " +
                (player.isSpy
                  ? "text-onBackground-alert"
                  : "text-onBackground-primary")
              }
            >
              {player.isSpy ? "Eres el impostor!" : currentCard}
            </CustomText>
          </Animated.View>
        )}
      </View>
    </GestureDetector>
  );
};
