import { PlayerState } from "../interfaces/playerState";

export class PlayerStateDto {
  players: Omit<PlayerState, "responseChosen">[];
}
