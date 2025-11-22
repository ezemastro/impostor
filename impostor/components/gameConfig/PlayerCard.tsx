import { Pressable, TextInput, View } from "react-native";
import { EditIcon, TrashIcon } from "../Icons";
import { useRef } from "react";

interface Props {
  player: Player;
  onRemove: () => void;
  onEdit: (text: string) => void;
}
export default function PlayerCard({ player, onRemove, onEdit }: Props) {
  const inputTextRef = useRef<TextInput>(null);
  return (
    <View className="flex-row items-center justify-between rounded-lg border-2 border-onBackground-accent px-2">
      <TextInput
        ref={inputTextRef}
        value={player.name}
        onChangeText={onEdit}
        className="text-onBackground-primary font-medium text-lg flex-grow"
      />
      <View className="flex-row gap-2">
        <Pressable onPress={() => inputTextRef.current?.focus()}>
          <EditIcon className="text-white" />
        </Pressable>
        <Pressable onPress={onRemove}>
          <TrashIcon className="text-alert" />
        </Pressable>
      </View>
    </View>
  );
}
