import Button from "../Button";
import TextButton from "../TextButton";
import { useGameInit } from "@/hooks/initGame";

export default function InitGameButton() {
  const handleSubmit = useGameInit();
  return (
    <Button onPress={handleSubmit}>
      <TextButton>Comenzar juego</TextButton>
    </Button>
  );
}
