import { create } from "zustand";

interface CurrentGameStore {
  categories: CategoryInfo[];
  setCategories: (categories: CategoryInfo[]) => void;
  players: Player[];
  setPlayers: (players?: Player[]) => void;
  cards: Card[];
  setCards: (cards: Card[]) => void;
  spyCount: number;
  setSpyCount: (spyCount: number) => void;
}

export const useCurrentGameStore = create<CurrentGameStore>((set) => ({
  categories: [],
  setCategories: (categories: CategoryInfo[]) => set(() => ({ categories })),
  players: [],
  setPlayers: (players?: Player[]) => set(() => ({ players })),
  cards: [],
  setCards: (cards: Card[]) => set(() => ({ cards })),
  spyCount: 1,
  setSpyCount: (spyCount: number) => set(() => ({ spyCount })),
}));
