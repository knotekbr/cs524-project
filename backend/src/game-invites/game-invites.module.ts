import { forwardRef, Module } from "@nestjs/common";
import { GameInvitesService } from "./game-invites.service";
import { GameInvitesController } from "./game-invites.controller";
import { GamesModule } from "src/games/games.module";

@Module({
  imports: [forwardRef(() => GamesModule)],
  providers: [GameInvitesService],
  controllers: [GameInvitesController],
  exports: [GameInvitesService],
})
export class GameInvitesModule {}
