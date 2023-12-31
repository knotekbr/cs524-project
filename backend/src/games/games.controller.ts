import { Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { GamesService } from "./games.service";
import { AuthUser } from "src/common/decorators/authUser.decorator";
import { UserDto } from "src/users/dtos/UserDto";
import { Role } from "src/common/enums/role.enum";

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

  @Get("admin")
  @Auth(Role.Admin)
  async getAllGamesAdmin() {
    return this.gamesService.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  @Post()
  async createGame(@AuthUser() user: UserDto) {
    const newGame = await this.gamesService.create({
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
    });

    return this.gamesService.update({
      where: { id: newGame.id },
      data: {
        events: {
          create: {
            eventType: "game_created",
            userId: user.id,
          },
        },
      },
    });
  }

  @Get("active")
  async getActiveGames(@AuthUser() user: UserDto) {
    return this.gamesService.findMany({
      where: {
        status: { not: "ended" },
        players: {
          some: {
            userId: user.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
      throw new NotFoundException("Game not found");
    }

    return game;
  }

  @Get(":id/play")
  async getGameplayState(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number) {
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
      throw new NotFoundException("Game not found or not eligible to start");
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
      throw new NotFoundException("Game not found or not in progress");
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
  @Post(":id/unpause")
  async unpauseGame(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number) {
    const game = await this.gamesService.findOne({
      id,
      createdById: user.id,
      status: "paused",
    });
    if (!game) {
      throw new NotFoundException("Game not found or not paused");
    }
    return this.gamesService.update({
      where: { id },
      data: {
        status: "in_progress",
        events: {
          create: {
            eventType: "game_restarted",
            userId: user.id,
          },
        },
      },
    });
  }
}
