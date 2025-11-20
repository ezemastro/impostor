import { useCurrentGameStore } from "@/stores/currentGame";
import { useRouter } from "expo-router";
import { useRandomCard } from "./randomCard";

export const useGameReset = () => {
  const router = useRouter();
  const setCurrentCard = useCurrentGameStore((state) => state.setCurrentCard);
  const cards = useCurrentGameStore((state) => state.cards);
  const { getRandomCard } = useRandomCard();

  const handleResetGame = () => {
    setCurrentCard(getRandomCard({ cards }));
    router.push("/game");
  };

  return handleResetGame;
};
