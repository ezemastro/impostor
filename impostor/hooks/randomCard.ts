import { useCurrentGameStore } from "@/stores/currentGame";
import { useState, useCallback } from "react";

export const useRandomCard = () => {
  const cards = useCurrentGameStore((state) => state.cards);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const getRandomCard = useCallback(
    ({ cards: paramCards }: { cards?: Card[] }) => {
      if (cards.length === 0) {
        setCurrentCard(null);
        return null;
      }
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = paramCards ? paramCards[randomIndex] : cards[randomIndex];
      setCurrentCard(card);
      return card;
    },
    [cards],
  );

  return { currentCard, getRandomCard };
};
