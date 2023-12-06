import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { AuthUser } from "src/common/decorators/authUser.decorator";
import { UserDto } from "src/users/dtos/UserDto";
import { GameInvitesService } from "./game-invites.service";
import { GamesService } from "src/games/games.service";
import { InvitePlayerDto } from "./dtos/InvitePlayerDto";

@Controller("game-invites")
@Auth()
export class GameInvitesController {
  constructor(
    private gamesService: GamesService,
    private gameInvitesService: GameInvitesService
  ) {}

  @Get()
  async getAllInvites(@AuthUser() user: UserDto) {
    return this.gameInvitesService.findMany({
      where: {
        invitedEmail: user.email.toLowerCase(),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  @Post(":id/invite")
  async invitePlayer(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number, @Body() body: InvitePlayerDto) {
    const { email: rawEmail } = body;
    const email = rawEmail.toLowerCase();
    if (email === user.email.toLowerCase()) {
      throw new BadRequestException("You can't invite yourself to a game");
    }

    const game = await this.gamesService.findOne({
      id,
      createdById: user.id,
      status: { not: "ended" },
    });
    if (!game) {
      throw new NotFoundException();
    }

    const existingInvite = await this.gameInvitesService.findOne({
      gameId_invitedEmail: {
        gameId: id,
        invitedEmail: email,
      },
    });
    if (existingInvite) {
      return;
    }

    await this.gamesService.update({
      where: { id },
      data: {
        invites: {
          create: { invitedEmail: email },
        },
      },
    });
  }

  @Post(":id/accept")
  async acceptInvite(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number) {
    const invite = await this.gameInvitesService.findOne({
      gameId_invitedEmail: {
        gameId: id,
        invitedEmail: user.email.toLowerCase(),
      },
    });
    if (!invite) {
      throw new NotFoundException();
    }

    this.gamesService.update({
      where: {
        id,
        status: { not: "ended" },
      },
      data: {
        players: {
          connectOrCreate: {
            where: {
              userId_gameId: {
                gameId: id,
                userId: user.id,
              },
            },
            create: {
              userId: user.id,
            },
          },
        },
      },
    });

    return this.gameInvitesService.delete({
      gameId_invitedEmail: {
        gameId: id,
        invitedEmail: user.email,
      },
    });
  }

  @Post(":id/decline")
  async declineInvite(@AuthUser() user: UserDto, @Param("id", ParseIntPipe) id: number) {
    return this.gameInvitesService.delete({
      gameId_invitedEmail: {
        gameId: id,
        invitedEmail: user.email.toLowerCase(),
      },
    });
  }
}
