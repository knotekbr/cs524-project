import { Module } from "@nestjs/common";
import { GameInvitesService } from "./game-invites.service";
import { GameInvitesController } from "./game-invites.controller";

@Module({
  providers: [GameInvitesService],
  controllers: [GameInvitesController],
})
export class GameInvitesModule {}
