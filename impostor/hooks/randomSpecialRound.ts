import { useCurrentGameStore } from "@/stores/currentGame";

export const useRandomSpecialRound = () => {
  const specialRounds = useCurrentGameStore((state) => state.specialRounds);

  const getRandomSpecialRound = (): string => {
    const roundTypes = Object.keys(specialRounds);
    const weights = Object.values(specialRounds);
    const totalWeight = Math.max(
      weights.reduce((sum, weight) => sum + weight, 0),
      1,
    );
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < roundTypes.length; i++) {
      cumulativeWeight += weights[i];
      if (randomValue < cumulativeWeight) {
        return roundTypes[i];
      }
    }
    return "normal";
  };

  return { getRandomSpecialRound };
};
