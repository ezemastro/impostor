import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  TextInput,
  View,
} from "react-native";
import Section from "../Section";
import CustomText from "../CustomText";
import { useCurrentGameStore } from "@/stores/currentGame";
import { SPECIAL_ROUNDS_TITLES } from "@/constants/specialRounds";
import { useState } from "react";
import Button from "../Button";
import TextButton from "../TextButton";
import { CrossIcon } from "../Icons";

export default function SpecialRoundSelection() {
  const specialRounds = useCurrentGameStore((state) => state.specialRounds);
  const setSpecialRounds = useCurrentGameStore(
    (state) => state.setSpecialRounds,
  );
  const [selectedSpecialRound, setSelectedSpecialRound] = useState<Record<
    string,
    number
  > | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (selectedSpecialRound) {
      const roundType = Object.keys(selectedSpecialRound)[0];
      const newValue = Math.min(Math.max(parseInt(inputValue) || 0, 0), 100);
      setSpecialRounds({
        ...specialRounds,
        [roundType]: newValue / 100,
      });
      setSelectedSpecialRound(null);
      setInputValue("");
    }
  };

  return (
    <>
      <Modal
        backdropColor={"transparent"}
        onRequestClose={() => setSelectedSpecialRound(null)}
        visible={selectedSpecialRound !== null}
      >
        <KeyboardAvoidingView
          behavior="padding"
          className="flex-1 justify-center"
        >
          <View className="bg-background-primary rounded-lg mx-4 my-auto p-4 py-8 gap-12">
            <Pressable
              className="absolute right-3 top-3 p-2 z-50"
              onPress={() => setSelectedSpecialRound(null)}
            >
              <CrossIcon className="text-onBackground-primary" />
            </Pressable>
            <CustomText className="text-3xl font-medium text-center">
              {
                SPECIAL_ROUNDS_TITLES[
                  Object.keys(selectedSpecialRound || {})[0]
                ]
              }
            </CustomText>
            <View className="flex-row items-center justify-center">
              <TextInput
                className="bg-background-primary rounded border border-onBackground-accent py-2 w-16 text-xl h-12 text-onBackground-primary text-center"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                keyboardType="numeric"
                maxLength={3}
              />
              <CustomText className="text-xl">/100</CustomText>
            </View>
            <Button onPress={handleSubmit}>
              <TextButton>Confirmar</TextButton>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Section>
        <View className="flex-row justify-between">
          <CustomText className="text-2xl font-medium">
            Rondas especiales:
          </CustomText>
        </View>
        <View className="flex-row flex-wrap items-center justify-evenly gap-2">
          {Object.entries(specialRounds).map(([roundType, value]) => (
            <Pressable
              key={roundType}
              className={
                "py-3 px-5 rounded-full items-center border border-onBackground-accent min-w-44 " +
                (value > 0 ? "bg-app-secondary" : "bg-transparent")
              }
              onPress={() => {
                setSelectedSpecialRound({ [roundType]: value });
                setInputValue(String(Math.round(value * 100)));
              }}
            >
              <CustomText className="text-center text-lg">
                {SPECIAL_ROUNDS_TITLES[roundType]}
              </CustomText>
              <CustomText className="text-center text-onBackground-secondary">
                {Math.round(value * 100)}/100
              </CustomText>
            </Pressable>
          ))}
        </View>
      </Section>
    </>
  );
}
