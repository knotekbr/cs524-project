import { GameSession } from "../interfaces/gameSession";
import { PlayerState } from "../interfaces/playerState";
import { newInitialBoardState } from "./newInitialBoardState";

export function newInitialGameSession(): GameSession {
  return {
    currRound: 0,
    currPlayerIndex: 0,
    currPlayerId: 0,
    currPhase: "lobby",
    phaseTimeUp: new Date().toISOString(),

    categories: [],
    promptsRemaining: 30,
    promptState: {
      category: "",
      prompt: "",
      value: 0,
      correctResponseIndex: 0,
      responses: [],
    },
    boardState: newInitialBoardState(),

    allClientStates: new Map<string, PlayerState>(),
    activeClientStates: new Map<string, PlayerState>(),
  };
}
