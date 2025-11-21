import { useCurrentGameStore } from "@/stores/currentGame";
import { useRandomSpies } from "./randomSpies";
import { useRandomCard } from "./randomCard";

export const useNewRound = () => {
  const cards = useCurrentGameStore((state) => state.cards);
  const setCurrentCard = useCurrentGameStore((state) => state.setCurrentCard);
  const setSpyIndices = useCurrentGameStore((state) => state.setSpyIndices);
  const { getRandomCard } = useRandomCard();
  const getNewSpiesSet = useRandomSpies();

  const handleNewRound = () => {
    setCurrentCard(getRandomCard({ cards }));
    setSpyIndices(getNewSpiesSet());
  };
  return handleNewRound;
};
