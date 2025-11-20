import { useCurrentGameStore } from "@/stores/currentGame";
import { useRouter } from "expo-router";
import { useCategoriesStore } from "@/stores/categories";
import { useRandomCard } from "./randomCard";

export const useGameInit = () => {
  const router = useRouter();
  const selectedCategories = useCurrentGameStore((state) => state.categories);
  const setCards = useCurrentGameStore((state) => state.setCards);
  const setCurrentCard = useCurrentGameStore((state) => state.setCurrentCard);
  const { getRandomCard } = useRandomCard();

  // Obtener las cartas seleccionadas
  const categories = useCategoriesStore((state) => state.categories);
  const cards = categories.flatMap((category) =>
    selectedCategories.some((sel) => sel.id === category.id)
      ? category.cards
      : [],
  );

  const handleInitGame = () => {
    setCards(cards);
    setCurrentCard(getRandomCard({ cards }));
    router.push("/game");
  };

  return handleInitGame;
};
