import { useCurrentGameStore } from "@/stores/currentGame";
import { useRandomCard } from "./randomCard";

export const useGame = () => {
  const { currentCard } = useRandomCard();
  const players = useCurrentGameStore((state) => state.players);
  const spyCount = useCurrentGameStore((state) => state.spyCount);

  // Array de numeros del 0 a players.length - 1
  const playerIndices = Array.from({ length: players.length }, (_, i) => i);
  // Mezclar el array
  playerIndices.sort(() => Math.random() - 0.5);
  // Tomar los primeros spyCount indices
  const spyIndices = new Set(playerIndices.slice(0, spyCount));
  // Asignar el rol a cada jugador
  const updatedPlayers = players.map((player, index) => ({
    ...player,
    isSpy: spyIndices.has(index),
  }));

  return { currentCard, players: updatedPlayers };
};
