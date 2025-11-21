import { useCurrentGameStore } from "@/stores/currentGame";
import { useCallback } from "react";

export const useRandomCard = () => {
  const cards = useCurrentGameStore((state) => state.cards);

  const getRandomCard = useCallback(
    ({ cards: paramCards }: { cards?: Card[] } = {}) => {
      if (cards.length === 0) {
        return null;
      }
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = paramCards ? paramCards[randomIndex] : cards[randomIndex];
      return card;
    },
    [cards],
  );

  return { getRandomCard };
};
