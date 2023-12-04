import { Module } from "@nestjs/common";
import { GamePlayersService } from "./game-players.service";

@Module({
  providers: [GamePlayersService],
  exports: [GamePlayersService],
})
export class GamePlayersModule {}
