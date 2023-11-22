import { Module } from "@nestjs/common";
import { AdminGamesController } from "./games.controller";

@Module({
  controllers: [AdminGamesController],
})
export class AdminGamesModule {}
