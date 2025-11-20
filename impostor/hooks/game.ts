import { useCurrentGameStore } from "@/stores/currentGame";

export const useGame = () => {
  const currentCard = useCurrentGameStore((state) => state.currentCard);
  const players = useCurrentGameStore((state) => state.players);
  const spyCount = useCurrentGameStore((state) => state.spyCount);
  // TODO TODO - Agregar aca para que el players sea un nuevo state que tenga los roles asignados así no se resetean en cada render y que se actualice con un use effect al cambiar la current card

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
