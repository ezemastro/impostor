import { useCurrentGameStore } from "@/stores/currentGame";

interface NewSpiesSetParams {
  playersCount: number;
  spyCount: number;
}
const newSpiesSet = ({ playersCount, spyCount }: NewSpiesSetParams) => {
  // Array de numeros del 0 a players.length - 1
  const playerIndices = Array.from({ length: playersCount }, (_, i) => i);
  // Mezclar el array
  playerIndices.sort(() => Math.random() - 0.5);
  // Tomar los primeros spyCount indices
  const spyIndices = new Set(playerIndices.slice(0, spyCount));
  // Asignar el rol a cada jugador
  return spyIndices;
};

export const useRandomSpies = () => {
  const playersCount = useCurrentGameStore((state) => state.players.length);
  const spyCount = useCurrentGameStore((state) => state.spyCount);
  const getNewSpiesSet = () => {
    return newSpiesSet({ playersCount, spyCount });
  };
  return { getNewSpiesSet };
};
