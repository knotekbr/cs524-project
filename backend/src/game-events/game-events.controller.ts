import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { GameEventsService } from "./game-events.service";
import { AuthUser } from "src/common/decorators/authUser.decorator";
import { UserDto } from "src/users/dtos/UserDto";
import { GamePlayersService } from "src/game-players/game-players.service";

@Controller("game-events")
@Auth()
export class GameEventsController {
  constructor(
    private gameEventsService: GameEventsService,
    private gamePlayersService: GamePlayersService
  ) {}

  @Get(":gameId")
  async getGameEvents(@AuthUser() user: UserDto, @Param("gameId", ParseIntPipe) gameId: number) {
    const gamePlayer = await this.gamePlayersService.findOne({
      userId_gameId: {
        gameId,
        userId: user.id,
      },
    });

    if (!gamePlayer && user.role !== "admin") {
      throw new NotFoundException();
    }

    return this.gameEventsService.findMany({
      where: {
        gameId,
      },
      orderBy: {
        timestamp: "asc",
      },
    });
  }
}
