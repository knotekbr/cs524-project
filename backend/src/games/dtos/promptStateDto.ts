import { GameSession } from "../interfaces/gameSession";
import { PromptState } from "../interfaces/promptState";

export class PromptStateDto {
  phaseTimeUp: GameSession["phaseTimeUp"];
  prompt: Omit<PromptState, "correctResponseIndex">;
  currPhase: GameSession["currPhase"];
}
