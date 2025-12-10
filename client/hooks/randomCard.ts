import { useCurrentGameStore } from "@/stores/currentGame";
import { useCallback } from "react";

export const useRandomCard = () => {
  const cards = useCurrentGameStore((state) => state.cards);
  const usedCards = useCurrentGameStore((state) => state.usedCards);
  const resetUsedCards = useCurrentGameStore((state) => state.resetUsedCards);

  const getRandomCard = useCallback(
    ({
      cards: paramCards,
      lastUsedCard,
    }: { cards?: Card[]; lastUsedCard?: Card } = {}) => {
      if (cards.length === 0 && (!paramCards || paramCards.length === 0)) {
        return null;
      }
      const currentUsedCards = [
        ...usedCards,
        ...(lastUsedCard ? [lastUsedCard] : []),
      ];
      let avalailableCards = paramCards
        ? paramCards.filter((card) => !currentUsedCards.includes(card))
        : cards.filter((card) => !currentUsedCards.includes(card));
      if (avalailableCards.length === 0) {
        resetUsedCards();
        avalailableCards = paramCards ? paramCards : cards;
      }
      const randomIndex = Math.floor(Math.random() * avalailableCards.length);
      const card = avalailableCards[randomIndex];
      return card;
    },
    [cards, resetUsedCards, usedCards],
  );

  return { getRandomCard };
};
