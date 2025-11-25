export const SPECIAL_ROUNDS = {
  EXTRA_SPY: "extraSpy",
  NO_SPY: "noSpy",
  ALL_SPY: "allSpy",
  RANDOM_CARDS: "randomCards",
  PLAYER_CARD: "playerCard",
};

export const SPECIAL_ROUNDS_TITLES: Record<
  (typeof SPECIAL_ROUNDS)[keyof typeof SPECIAL_ROUNDS],
  string
> = {
  [SPECIAL_ROUNDS.EXTRA_SPY]: "Espía extra",
  [SPECIAL_ROUNDS.NO_SPY]: "Sin espías",
  [SPECIAL_ROUNDS.ALL_SPY]: "Todos son espías",
  [SPECIAL_ROUNDS.RANDOM_CARDS]: "Palabras aleatorias",
  [SPECIAL_ROUNDS.PLAYER_CARD]: "Jugador como palabra",
};
