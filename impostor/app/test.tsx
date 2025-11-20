import { View, Text } from "react-native";
import React from "react";
import MainView from "@/components/MainView";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function Test() {
  const rotateY = useSharedValue(0);
  const gesture = Gesture.Tap().onStart(() => {
    rotateY.value = withTiming(rotateY.value + 180, { duration: 500 });
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotateY.value}deg` }],
    };
  });
  return (
    <MainView>
      <GestureHandlerRootView>
        <View className="flex-1 items-center justify-center">
          <GestureDetector gesture={gesture}>
            <Animated.View
              className="bg-background-secondary w-64 h-32"
              style={animatedStyle}
            >
              <Text>Test Page</Text>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </MainView>
  );
}
