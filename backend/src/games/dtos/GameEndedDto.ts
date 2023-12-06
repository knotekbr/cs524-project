import { GameSession } from "../interfaces/gameSession";
import { PlayerState } from "../interfaces/playerState";

export class GameEndedDto {
  boardState: GameSession["boardState"];
  categories: GameSession["categories"];
  currPhase: GameSession["currPhase"];
  currPlayerId: GameSession["currPlayerId"];
  currRound: GameSession["currRound"];
  phaseTimeUp: GameSession["phaseTimeUp"];
  players: Omit<PlayerState, "responseChosen">[];
  status: "ended";
}
