import { Module } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GamesController } from "./games.controller";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { GamesGateway } from "./games.gateway";

@Module({
  imports: [AuthModule, UsersModule],
  providers: [GamesService, GamesGateway],
  controllers: [GamesController],
  exports: [GamesService],
})
export class GamesModule {}
