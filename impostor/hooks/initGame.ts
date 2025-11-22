import { useCurrentGameStore } from "@/stores/currentGame";
import { useRouter } from "expo-router";
import { useCategoriesStore } from "@/stores/categories";
import { useNewRound } from "./newRound";

export const useGameInit = () => {
  const router = useRouter();
  const selectedCategories = useCurrentGameStore((state) => state.categories);
  const setCards = useCurrentGameStore((state) => state.setCards);
  const handleNewRound = useNewRound();

  // Obtener las cartas seleccionadas
  const categories = useCategoriesStore((state) => state.categories);
  const cards = categories.flatMap((category) =>
    selectedCategories.some((sel) => sel.id === category.id)
      ? category.cards
      : [],
  );

  const handleInitGame = () => {
    setCards(cards);
    handleNewRound();
    router.push("/game");
  };

  return handleInitGame;
};
