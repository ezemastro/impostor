import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPECIAL_ROUNDS } from "@/constants/specialRounds";

interface CurrentGameStore {
  categories: CategoryInfo[];
  setCategories: (categories: CategoryInfo[]) => void;
  players: Player[];
  setPlayers: (players?: Player[]) => void;
  cards: Card[];
  setCards: (cards: Card[]) => void;
  spyCount: number;
  setSpyCount: (spyCount: number) => void;
  currentCard: Card | null;
  setCurrentCard: (currentCard: Card | null) => void;
  spyIndices: Set<number>;
  setSpyIndices: (spyIndices: Set<number>) => void;
  specialRounds: Record<
    (typeof SPECIAL_ROUNDS)[keyof typeof SPECIAL_ROUNDS],
    number
  >;
  setSpecialRounds: (
    specialRounds: Record<
      (typeof SPECIAL_ROUNDS)[keyof typeof SPECIAL_ROUNDS],
      number
    >,
  ) => void;
  currentRound: (typeof SPECIAL_ROUNDS)[keyof typeof SPECIAL_ROUNDS] | "normal";
  setCurrentRound: (currentRound: string) => void;
  usedCards: Card[];
  pushUsedCard: (card: Card) => void;
  resetUsedCards: () => void;
}

export const useCurrentGameStore = create<CurrentGameStore>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories: CategoryInfo[]) =>
        set(() => ({ categories })),
      players: [],
      setPlayers: (players?: Player[]) => set(() => ({ players })),
      cards: [],
      setCards: (cards: Card[]) => set(() => ({ cards })),
      spyCount: 1,
      setSpyCount: (spyCount: number) => set(() => ({ spyCount })),
      currentCard: null,
      setCurrentCard: (currentCard: Card | null) =>
        set(() => ({ currentCard })),
      spyIndices: new Set<number>(),
      setSpyIndices: (spyIndices: Set<number>) => set(() => ({ spyIndices })),
      specialRounds: {
        [SPECIAL_ROUNDS.EXTRA_SPY]: 0.05,
        [SPECIAL_ROUNDS.NO_SPY]: 0.05,
        [SPECIAL_ROUNDS.ALL_SPY]: 0.05,
        [SPECIAL_ROUNDS.RANDOM_CARDS]: 0.01,
        [SPECIAL_ROUNDS.PLAYER_CARD]: 0.01,
      },
      setSpecialRounds: (
        specialRounds: Record<
          (typeof SPECIAL_ROUNDS)[keyof typeof SPECIAL_ROUNDS],
          number
        >,
      ) => set(() => ({ specialRounds })),
      currentRound: "normal",
      setCurrentRound: (currentRound: string) => set(() => ({ currentRound })),
      usedCards: [],
      resetUsedCards: () => set(() => ({ usedCards: [] })),
      pushUsedCard: (card: Card) =>
        set((state) => ({ usedCards: [...state.usedCards, card] })),
    }),
    {
      name: "current-game-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
