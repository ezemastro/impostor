import { useCurrentGameStore } from "@/stores/currentGame";
import { useEffect, useState } from "react";

export const useGame = () => {
  const currentCard = useCurrentGameStore((state) => state.currentCard);
  const players = useCurrentGameStore((state) => state.players);
  const spyCount = useCurrentGameStore((state) => state.spyCount);
  const [spyIndices, setSpyIndices] = useState<Set<number>>(new Set());

  const playerIndices = Array.from({ length: players.length }, (_, i) => i);
  useEffect(() => {
    playerIndices.sort(() => Math.random() - 0.5);
    const spyIndices = new Set(playerIndices.slice(0, spyCount));
    setSpyIndices(spyIndices);
  }, [players.length, spyCount, currentCard]);

  // Array de numeros del 0 a players.length - 1
  // Mezclar el array
  // Tomar los primeros spyCount indices
  // Asignar el rol a cada jugador
  const updatedPlayers = players.map((player, index) => ({
    ...player,
    isSpy: spyIndices.has(index),
  }));

  return { currentCard, players: updatedPlayers };
};
