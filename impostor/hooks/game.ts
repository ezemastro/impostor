import { useCurrentGameStore } from "@/stores/currentGame";
import { useEffect, useState } from "react";

export const useGame = () => {
  const currentCard = useCurrentGameStore((state) => state.currentCard);
  const players = useCurrentGameStore((state) => state.players);
  const spyCount = useCurrentGameStore((state) => state.spyCount);
  const [spyIndices, setSpyIndices] = useState<Set<number>>(new Set());

  // Array de numeros del 0 a players.length - 1
  const playerIndices = Array.from({ length: players.length }, (_, i) => i);
  useEffect(() => {
    // Mezclar el array
    playerIndices.sort(() => Math.random() - 0.5);
    // Tomar los primeros spyCount indices
    const spyIndices = new Set(playerIndices.slice(0, spyCount));
    // Asignar el rol a cada jugador
    setSpyIndices(spyIndices);
  }, [players.length, spyCount, currentCard, playerIndices]);

  const updatedPlayers = players.map((player, index) => ({
    ...player,
    isSpy: spyIndices.has(index),
  }));

  return { currentCard, players: updatedPlayers };
};
