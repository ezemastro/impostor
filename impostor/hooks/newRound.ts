import { useCurrentGameStore } from "@/stores/currentGame";
import { useRandomSpies } from "./randomSpies";
import { useRandomCard } from "./randomCard";
import { useRandomSpecialRound } from "./randomSpecialRound";

export const useNewRound = () => {
  const cards = useCurrentGameStore((state) => state.cards);
  const specialRounds = useCurrentGameStore((state) => state.specialRounds);
  const setCurrentRound = useCurrentGameStore((state) => state.setCurrentRound);
  const setCurrentCard = useCurrentGameStore((state) => state.setCurrentCard);
  const setSpyIndices = useCurrentGameStore((state) => state.setSpyIndices);
  const { getRandomCard } = useRandomCard();
  const { getNewSpiesSet } = useRandomSpies();
  const { getRandomSpecialRound } = useRandomSpecialRound();

  const handleNewRound = () => {
    setCurrentRound(getRandomSpecialRound());
    setCurrentCard(getRandomCard({ cards }));
    setSpyIndices(getNewSpiesSet());
  };
  return handleNewRound;
};
