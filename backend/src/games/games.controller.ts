import { Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { GamesService } from "./games.service";
import { AuthUser } from "src/common/decorators/authUser.decorator";
import { UserDto } from "src/users/dtos/UserDto";

@Controller("games")
@Auth()
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  async getAllPlayedGames(@AuthUser() user: UserDto) {
    return this.gamesService.findMany({
      where: {
        players: {
          some: { userId: user.id },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  @Post()
  async createGame(@AuthUser() user: UserDto) {
    return this.gamesService.create({
      createdBy: {
        connect: { id: user.id },
      },
      players: {
        create: {
          user: {
            connect: { id: user.id },
          },
        },
      },
      events: {
        create: {
          eventType: "game_created",
          userId: user.id,
        },
      },
    });
  }

  @Get(":id")
  async getPlayedGame(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number) {
    const game = await this.gamesService.findOne({
      id,
      players: {
        some: { userId: user.id },
      },
    });
    if (!game) {
      throw new NotFoundException();
    }

    return game;
  }

  @Get(":id/join")
  async joinGame(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number) {
    const game = await this.gamesService.findOnePlayable(id, user.id);
    if (!game) {
      throw new NotFoundException();
    }

    return game;
  }

  @Post(":id/start")
  async startGame(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number) {
    const game = await this.gamesService.findOne({ id, createdById: user.id, status: { in: ["created", "paused"] } });
    if (!game) {
      throw new NotFoundException();
    }

    return this.gamesService.update({
      where: { id },
      data: {
        status: "in_progress",
        events: {
          create: {
            eventType: game.status === "created" ? "game_started" : "game_restarted",
            userId: user.id,
          },
        },
      },
    });
  }

  @Post(":id/pause")
  async pauseGame(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number) {
    const game = await this.gamesService.findOne({
      id,
      createdById: user.id,
      status: "in_progress",
    });
    if (!game) {
      throw new NotFoundException();
    }

    return this.gamesService.update({
      where: { id },
      data: {
        status: "paused",
        events: {
          create: {
            eventType: "game_paused",
            userId: user.id,
          },
        },
      },
    });
  }
}
