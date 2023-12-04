import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { GamesModule } from "./games/games.module";
import { GameInvitesModule } from "./game-invites/game-invites.module";
import { AdminModule } from "./admin/admin.module";
import { AnswerPromptsModule } from "./answer-prompts/answer-prompts.module";
import { GamePlayersModule } from "./game-players/game-players.module";
import { AnswerCategoriesModule } from "./answer-categories/answer-categories.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    GamesModule,
    GameInvitesModule,
    AdminModule,
    AnswerPromptsModule,
    GamePlayersModule,
    AnswerCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
