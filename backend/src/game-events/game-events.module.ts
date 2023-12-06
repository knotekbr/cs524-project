import { Module } from "@nestjs/common";
import { GameEventsService } from "./game-events.service";
import { GameEventsController } from "./game-events.controller";
import { GamePlayersModule } from "src/game-players/game-players.module";

@Module({
  imports: [GamePlayersModule],
  providers: [GameEventsService],
  controllers: [GameEventsController],
})
export class GameEventsModule {}
