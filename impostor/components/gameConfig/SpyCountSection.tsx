import { View } from "react-native";
import Section from "../Section";
import CustomText from "../CustomText";
import { useCurrentGameStore } from "@/stores/currentGame";
import CountControl from "./CountControl";

export default function SpyCountSection() {
  const spyCount = useCurrentGameStore((state) => state.spyCount);
  const setSpyCount = useCurrentGameStore((state) => state.setSpyCount);

  const handleAddSpy = () => {
    setSpyCount(spyCount + 1);
  };
  const handleRemoveSpy = () => {
    if (spyCount > 1) {
      setSpyCount(spyCount - 1);
    }
  };
  return (
    <Section>
      <View className="flex-row justify-between">
        <CustomText className="text-2xl font-medium">
          Cantidad de espías:
        </CustomText>
      </View>
      <CountControl
        count={spyCount}
        onAdd={handleAddSpy}
        onRemove={handleRemoveSpy}
      />
    </Section>
  );
}
