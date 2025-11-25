import { useRouter } from "expo-router";
import { useNewRound } from "./newRound";

export const useGameReset = () => {
  const router = useRouter();
  const handleNewRound = useNewRound();

  const handleResetGame = () => {
    handleNewRound();
    router.push("/game");
  };

  return handleResetGame;
};
