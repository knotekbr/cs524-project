import { Module } from "@nestjs/common";
import { AdminGamesController } from "./games.controller";
import { GamesService } from "src/games/games.service";
import { GamesModule } from "src/games/games.module"; //the module that provides the GamesService

@Module({
  imports: [GamesModule], //importing GamesModule
  controllers: [AdminGamesController],
  providers: [GamesService],
})
export class AdminGamesModule {}
