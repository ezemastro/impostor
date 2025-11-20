import { useCurrentGameStore } from "@/stores/currentGame";
import { useEffect, useState, useCallback } from "react";

export const useRandomCard = () => {
  const cards = useCurrentGameStore((state) => state.cards);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const getRandomCard = useCallback(() => {
    if (cards.length === 0) {
      setCurrentCard(null);
      return null;
    }
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    setCurrentCard(card);
    return card;
  }, [cards]);

  useEffect(() => {
    getRandomCard();
  }, [getRandomCard, cards]);

  return { currentCard, getRandomCard };
};
