import { UseFilters } from "@nestjs/common/decorators";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  BaseWsExceptionFilter,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GamesService } from "./games.service";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { JoinGameDto } from "./dtos/joinGameDto";
import { LeaveGameDto } from "./dtos/leaveGameDto";
import { GameSession } from "./interfaces/gameSession";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  path: "/play",
})
@UseFilters(new BaseWsExceptionFilter())
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  connectedUsers = new Map<string, number>();
  gameSessions = new Map<number, GameSession>();

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private gamesService: GamesService
  ) {}

  async handleConnection(client: Socket) {
    const authToken = client.handshake.headers.authorization || "";
    const user = await this.authService.verifyAuthToken(authToken);

    if (!user) {
      client.disconnect(true);
      return;
    }

    this.connectedUsers.set(client.id, user.id);

    if (user.activeGameId) {
      this.joinGame(client, { gameId: user.activeGameId });
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = this.connectedUsers.get(client.id) || -1;
    const user = await this.usersService.findOne({ id: userId });
    const activeGameId = user?.activeGameId;

    if (activeGameId) {
      await this.leaveGame(client, { gameId: activeGameId });
    }

    this.connectedUsers.delete(client.id);
  }

  @SubscribeMessage("join_game")
  async joinGame(@ConnectedSocket() client: Socket, @MessageBody() message: JoinGameDto) {
    const { gameId } = message;
    const userId = this.connectedUsers.get(client.id) || -1;

    const game = await this.gamesService.findOnePlayable(gameId, userId);
    if (!game) {
      return this.emitError(client, "Invalid game");
    }

    await this.usersService.updateActiveGame(userId, gameId);
    await this.gamesService.update({
      where: { id: gameId },
      data: {
        events: {
          create: {
            eventType: "player_joined",
            userId,
          },
        },
      },
    });

    if (this.gameSessions.has(gameId)) {
      const session = this.gameSessions.get(gameId)!;
      session.allClientIds.add(client.id);
      session.activeClientIds.add(client.id);
    } else {
      this.gameSessions.set(gameId, {
        currPlayerIndex: 0,
        allClientIds: new Set(client.id),
        activeClientIds: new Set(client.id),
      });
    }

    const gameIdStr = game.id.toString();
    client.join(gameIdStr);
  }

  @SubscribeMessage("leave_game")
  async leaveGame(@ConnectedSocket() client: Socket, @MessageBody() message: LeaveGameDto) {
    const { gameId } = message;
    const userId = this.connectedUsers.get(client.id) || -1;

    await this.usersService.updateActiveGame(userId, null);

    const game = await this.gamesService.findOnePlayable(gameId, userId);
    if (game) {
      await this.gamesService.update({
        where: { id: gameId },
        data: {
          events: {
            create: {
              eventType: "player_left",
              userId,
            },
          },
        },
      });

      if (this.gameSessions.has(gameId)) {
        const session = this.gameSessions.get(gameId)!;
        session.activeClientIds.delete(client.id);

        if (session.activeClientIds.size === 0) {
          this.gameSessions.delete(gameId);
          await this.gamesService.update({
            where: { id: gameId },
            data: {
              status: "ended",
              events: {
                create: {
                  eventType: "game_ended",
                  eventDetails: "All players left",
                },
              },
            },
          });
        }
      }

      const gameIdStr = game.id.toString();
      client.leave(gameIdStr);
    }
  }

  emitError(client: Socket, message: string) {
    client.emit("error", message);
  }
}
