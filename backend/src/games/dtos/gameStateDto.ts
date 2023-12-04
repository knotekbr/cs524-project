import { GameSession } from "../interfaces/gameSession";

export class GameStateDto {
  boardState: GameSession["boardState"];
  categories: GameSession["categories"];
  currPhase: GameSession["currPhase"];
  currPlayerId: GameSession["currPlayerId"];
  currRound: GameSession["currRound"];
  phaseTimeUp: GameSession["phaseTimeUp"];
}
