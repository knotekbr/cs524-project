export type GameSession = {
  currPlayerIndex: number;
  allClientIds: Set<string>;
  activeClientIds: Set<string>;
};
