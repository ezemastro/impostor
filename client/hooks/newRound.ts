import { useCurrentGameStore } from "@/stores/currentGame";
import { useRandomSpies } from "./randomSpies";
import { useRandomCard } from "./randomCard";
import { useRandomSpecialRound } from "./randomSpecialRound";

export const useNewRound = () => {
  const cards = useCurrentGameStore((state) => state.cards);
  const setCurrentRound = useCurrentGameStore((state) => state.setCurrentRound);
  const currentCard = useCurrentGameStore((state) => state.currentCard);
  const pushUsedCard = useCurrentGameStore((state) => state.pushUsedCard);
  const setCurrentCard = useCurrentGameStore((state) => state.setCurrentCard);
  const setSpyIndices = useCurrentGameStore((state) => state.setSpyIndices);
  const { getRandomCard } = useRandomCard();
  const { getNewSpiesSet } = useRandomSpies();
  const { getRandomSpecialRound } = useRandomSpecialRound();

  const handleNewRound = ({
    isNew: isNew,
    cards: newCards,
  }: { isNew?: boolean; cards?: Card[] } = {}) => {
    const currentRound = getRandomSpecialRound();
    if (!isNew && currentCard) pushUsedCard(currentCard!);
    setCurrentRound(currentRound);
    setCurrentCard(
      getRandomCard({
        cards: newCards ?? cards,
        lastUsedCard: isNew ? (currentCard ?? undefined) : undefined,
      }),
    );
    setSpyIndices(getNewSpiesSet({ currentRound }));
  };
  return handleNewRound;
};
