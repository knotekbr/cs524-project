import { forwardRef, Module } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { GamesGateway } from "./games.gateway";
import { GameInvitesModule } from "src/game-invites/game-invites.module";
import { GamePlayersModule } from "src/game-players/game-players.module";
import { AnswerCategoriesModule } from "src/answer-categories/answer-categories.module";
import { AnswerPromptsModule } from "src/answer-prompts/answer-prompts.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GamePlayersModule,
    AnswerCategoriesModule,
    AnswerPromptsModule,
    forwardRef(() => GameInvitesModule),
  ],
  providers: [GamesService, GamesGateway],
  controllers: [GamesController],
  exports: [GamesService],
})
export class GamesModule {}
