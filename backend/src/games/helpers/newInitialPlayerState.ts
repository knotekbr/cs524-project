import { PlayerState } from "../interfaces/playerState";

export function newInitialPlayerState(id: number, nickname: string): PlayerState {
  return {
    id,
    nickname,
    score: 0,
    responseChosen: false,
  };
}
