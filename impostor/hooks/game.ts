import { useCurrentGameStore } from "@/stores/currentGame";

export const useGame = () => {
  const currentCard = useCurrentGameStore((state) => state.currentCard);
  const players = useCurrentGameStore((state) => state.players);
  const spyIndices = useCurrentGameStore((state) => state.spyIndices);
  console.log(spyIndices);

  const updatedPlayers = players.map((player, index) => ({
    ...player,
    isSpy: spyIndices.has(index),
  }));

  return { currentCard, players: updatedPlayers };
};
