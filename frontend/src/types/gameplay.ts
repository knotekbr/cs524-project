export type GameCategory = {
  categoryName: string;
  answersAvailable: [boolean, boolean, boolean, boolean, boolean];
};

export type GamePlayer = {
  id: number;
  nickname: string;
  score: number;
};

export type GameState = {
  categories: GameCategory[];
  players: GamePlayer[];
  currentPlayerId: number;
  currentPlayerNickname: string;
};
