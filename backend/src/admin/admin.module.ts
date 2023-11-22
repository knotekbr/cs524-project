import { Module } from "@nestjs/common";
import { AdminGamesModule } from "./games/games.module";
import { AdminAnswerPromptsModule } from "./answer-prompts/answer-prompts.module";

@Module({
  imports: [AdminGamesModule, AdminAnswerPromptsModule],
})
export class AdminModule {}
