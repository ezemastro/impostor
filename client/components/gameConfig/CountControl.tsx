import { View, Pressable } from "react-native";
import CustomText from "../CustomText";
import { MinusIcon, PlusIcon } from "../Icons";

interface Props {
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}
export default function CountControl({ count, onAdd, onRemove }: Props) {
  return (
    <View className="flex-row items-center justify-center gap-6">
      <Pressable
        onPress={onRemove}
        disabled={count === 0}
        className="border-2 border-onBackground-accent size-12 rounded-full items-center justify-center"
      >
        <MinusIcon className="text-white" />
      </Pressable>
      <CustomText className="text-4xl">{count}</CustomText>
      <Pressable
        onPress={onAdd}
        className="border-2 border-onBackground-accent size-12 rounded-full items-center justify-center"
      >
        <PlusIcon className="text-white" />
      </Pressable>
    </View>
  );
}
