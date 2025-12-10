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
  [SPECIAL_ROUNDS.RANDOM_CARDS]: "Palabras diferentes",
  [SPECIAL_ROUNDS.PLAYER_CARD]: "Jugador como palabra",
};

export const SPECIAL_ROUNDS_INITIAL_VALUES: Record<
  (typeof SPECIAL_ROUNDS)[keyof typeof SPECIAL_ROUNDS],
  number
> = {
  [SPECIAL_ROUNDS.EXTRA_SPY]: 0,
  [SPECIAL_ROUNDS.NO_SPY]: 0.05,
  [SPECIAL_ROUNDS.ALL_SPY]: 0.05,
  [SPECIAL_ROUNDS.RANDOM_CARDS]: 0.01,
  [SPECIAL_ROUNDS.PLAYER_CARD]: 0.01,
};
