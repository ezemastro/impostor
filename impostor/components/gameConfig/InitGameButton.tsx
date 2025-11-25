import { useCurrentGameStore } from "@/stores/currentGame";
import Button from "../Button";
import TextButton from "../TextButton";
import { useGameInit } from "@/hooks/initGame";

export default function InitGameButton() {
  const handleSubmit = useGameInit();
  const selectedCategories = useCurrentGameStore((state) => state.categories);
  const selectedPlayers = useCurrentGameStore((state) => state.players);
  const selectedSpies = useCurrentGameStore((state) => state.spyCount);

  const disabled =
    selectedCategories.length === 0 ||
    selectedPlayers.length < 2 ||
    selectedSpies < 1 ||
    selectedSpies >= selectedPlayers.length;
  return (
    <Button onPress={handleSubmit} disabled={disabled}>
      <TextButton>Comenzar juego</TextButton>
    </Button>
  );
}
