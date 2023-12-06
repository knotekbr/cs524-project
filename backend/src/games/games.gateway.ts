import { UseFilters } from "@nestjs/common";
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
import { newInitialPlayerState } from "./helpers/newInitialPlayerState";
import { newInitialGameSession } from "./helpers/newInitialGameSession";
import { InvitePlayerDto } from "./dtos/invitePlayerDto";
import { Game, User } from "@prisma/client";
import { GameInvitesService } from "src/game-invites/game-invites.service";
import { GamePlayersService } from "src/game-players/game-players.service";
import { AnswerCategoriesService } from "src/answer-categories/answer-categories.service";
import { AnswerPromptsService } from "src/answer-prompts/answer-prompts.service";
import { PlayerStateDto } from "./dtos/playerStateDto";
import { GameStateDto } from "./dtos/gameStateDto";
import { add } from "date-fns";
import { SelectPromptDto } from "./dtos/selectPromptDto";
import { PromptStateDto } from "./dtos/promptStateDto";
import { SelectResponseDto } from "./dtos/selectResponseDto";
import { GameEndedDto } from "./dtos/GameEndedDto";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  path: "/play",
})
@UseFilters(new BaseWsExceptionFilter())
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  /** Maps player socket IDs to player database IDs */
  connectedUsers = new Map<string, number>();
  /** Maps game database IDs to game session state objects */
  gameSessions = new Map<number, GameSession>();

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private gamesService: GamesService,
    private gameInvitesService: GameInvitesService,
    private gamePlayersService: GamePlayersService,
    private answerCategoriesService: AnswerCategoriesService,
    private answerPromptsService: AnswerPromptsService
  ) {}

  // ----------------------------------
  // Interface requirements
  // ----------------------------------

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
    } else {
      client.emit("connection_established");
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

  // ----------------------------------
  // Message subscriptions
  // ----------------------------------

  @SubscribeMessage("join_game")
  async joinGame(@ConnectedSocket() client: Socket, @MessageBody() message: JoinGameDto) {
    const { gameId } = message;
    const userId = this.connectedUsers.get(client.id) || -1;
    const user = await this.usersService.findOne({ id: userId });
    if (!user) {
      this.emitError(client, "Unable to join game");
      return;
    }

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

    let session: GameSession;
    if (this.gameSessions.has(gameId)) {
      // If this game session already exists, update its state to include the new player
      session = this.gameSessions.get(gameId)!;

      if (session.allClientStates.has(client.id)) {
        // If the player has already been in the game, copy their existing state
        const existingScore = session.allClientStates.get(client.id)!;
        session.activeClientStates.set(client.id, existingScore);
      } else {
        // Else the player has not already been in the game, create a new state for them
        const newPlayerState = newInitialPlayerState(user.id, user.nickname);

        session.allClientStates.set(client.id, newPlayerState);
        session.activeClientStates.set(client.id, newPlayerState);
      }
    } else {
      // Else this is a new game session, create a new state for it
      const newPlayerState = newInitialPlayerState(user.id, user.nickname);
      session = newInitialGameSession();

      session.allClientStates.set(client.id, newPlayerState);
      session.activeClientStates.set(client.id, newPlayerState);

      this.gameSessions.set(gameId, session);
    }

    const gameIdStr = game.id.toString();
    client.join(gameIdStr);

    const playerStateMessage = this.getPlayerStateMessage(session);
    this.server.to(gameIdStr).emit("player_state", playerStateMessage);

    if (game.status !== "created") {
      const gameStateMessage = this.getGameStateMessage(session);
      client.emit("game_state", gameStateMessage);
    }
  }

  @SubscribeMessage("leave_game")
  async leaveGame(@ConnectedSocket() client: Socket, @MessageBody() message: LeaveGameDto) {
    const { gameId } = message;
    const userId = this.connectedUsers.get(client.id);
    if (!userId) {
      this.emitError(client, "Unable to leave game");
      return;
    }

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

      const gameIdStr = game.id.toString();
      if (this.gameSessions.has(gameId)) {
        const session = this.gameSessions.get(gameId)!;
        session.activeClientStates.delete(client.id);

        if (session.activeClientStates.size === 0) {
          await this.endGame(gameId, session, "All players left");
        } else {
          const playerStateMessage = this.getPlayerStateMessage(session);
          this.server.to(gameIdStr).emit("player_state", playerStateMessage);
        }
      }

      client.leave(gameIdStr);
    }
  }

  @SubscribeMessage("invite_player")
  async invitePlayer(@ConnectedSocket() client: Socket, @MessageBody() message: InvitePlayerDto) {
    const { email: rawEmail } = message;
    const email = rawEmail.toLowerCase();

    const [user, game] = await this.getUserAndGameFromClient(client);

    if (!user || !game || user.id !== game.createdById) {
      this.emitError(client, "Unable to invite player");
      return;
    }
    if (email === user.email.toLowerCase()) {
      this.emitError(client, "You can't invite yourself");
      return;
    }

    const existingInvite = await this.gameInvitesService.findOne({
      gameId_invitedEmail: {
        gameId: game.id,
        invitedEmail: email,
      },
    });
    if (existingInvite) {
      this.emitError(client, "Player already invited");
      return;
    }

    const invitedUser = await this.usersService.findOne({ email });
    if (invitedUser) {
      const existingPlayer = await this.gamePlayersService.findOne({
        userId_gameId: {
          gameId: game.id,
          userId: invitedUser.id,
        },
      });
      if (existingPlayer) {
        this.emitError(client, "Player already invited");
        return;
      }
    }

    await this.gameInvitesService.create({
      game: {
        connect: { id: game.id },
      },
      invitedEmail: email,
    });
  }

  @SubscribeMessage("start_game")
  async startGame(@ConnectedSocket() client: Socket) {
    const [user, game] = await this.getUserAndGameFromClient(client);
    if (!user || !game || user.id !== game.createdById || game.status !== "created") {
      this.emitError(client, "Unable to start game");
      return;
    }

    const session = this.gameSessions.get(game.id);
    if (!session) {
      this.emitError(client, "Unable to start game");
      return;
    }

    const categories = await this.answerCategoriesService.findManyRandom(6);
    if (categories.length < 6) {
      this.emitError(client, "Not enough categories to start game");
      return;
    }
    session.categories = categories;

    await this.gamesService.update({
      where: { id: game.id },
      data: {
        status: "in_progress",
        events: {
          create: {
            eventType: "game_started",
            userId: user.id,
          },
        },
      },
    });

    await this.gamePhaseTransition(game.id, session, "prompts");
  }

  @SubscribeMessage("pause_game")
  async pauseGame(@ConnectedSocket() client: Socket) {
    this.emitError(client, "Pause/unpause is not implemented");
  }

  @SubscribeMessage("unpause_game")
  async unpauseGame(@ConnectedSocket() client: Socket) {
    this.emitError(client, "Pause/unpause is not implemented");
  }

  @SubscribeMessage("select_prompt")
  async selectPrompt(@ConnectedSocket() client: Socket, @MessageBody() message: SelectPromptDto) {
    const { categoryIndex, promptIndex, roundNumber } = message;
    const [user, game] = await this.getUserAndGameFromClient(client);
    const session = this.gameSessions.get(game?.id || -1);
    if (!user || !game || !session) {
      this.emitError(client, "Unable to select prompt");
      return;
    }

    if (user.id !== session.currPlayerId || roundNumber !== session.currRound || session.currPhase !== "prompts") {
      this.emitError(client, "It's no longer your turn to select a prompt");
      return;
    }

    if (!session.boardState[categoryIndex][promptIndex]) {
      this.emitError(client, "This prompt has already been chosen");
      return;
    }

    clearTimeout(session.timeout);

    const category = session.categories[categoryIndex];
    const [prompt] = await this.answerPromptsService.findMany({
      where: {
        categoryId: category.id,
        difficulty: promptIndex + 1,
      },
      take: 1,
    });

    if (!prompt) {
      this.endGame(game.id, session, "Unable to find a prompt");
      return;
    }

    const correctResponseIndex = Math.floor(Math.random() * 4);
    const responses: string[] = [];

    for (let i = 0; i < 4; i++) {
      if (i === correctResponseIndex) {
        responses.push(prompt.correctResponse);
      } else {
        responses.push(prompt.otherResponses.pop() || "");
      }
    }

    session.boardState[categoryIndex][promptIndex] = false;
    session.promptsRemaining--;
    session.promptState = {
      category: category.categoryName,
      correctResponseIndex,
      prompt: prompt.prompt,
      responses,
      value: prompt.difficulty * 200,
    };

    await this.gamePhaseTransition(game.id, session, "answers");
  }

  @SubscribeMessage("select_response")
  async selectResponse(@ConnectedSocket() client: Socket, @MessageBody() message: SelectResponseDto) {
    const { responseIndex, roundNumber } = message;
    const [user, game] = await this.getUserAndGameFromClient(client);
    const session = this.gameSessions.get(game?.id || -1);
    if (!user || !game || !session) {
      this.emitError(client, "Unable to select response");
      return;
    }

    if (roundNumber !== session.currRound || session.currPhase !== "answers") {
      this.emitError(client, "It's no longer your turn to select an answer");
    }

    const playerState = session.allClientStates.get(client.id);
    if (!playerState) {
      this.emitError(client, "Unable to select response");
      return;
    }

    playerState.responseChosen = true;
    if (responseIndex === session.promptState.correctResponseIndex) {
      playerState.score += session.promptState.value;
    } else if (responseIndex !== 4) {
      playerState.score -= session.promptState.value;
    }

    const allActiveClients = [...session.activeClientStates.values()];
    if (allActiveClients.every((value) => value.responseChosen)) {
      clearTimeout(session.timeout);
      await this.gamePhaseTransition(game.id, session, "prompts");
    }
  }

  // ----------------------------------
  // Helpers
  // ----------------------------------

  getGameStateMessage(session: GameSession): GameStateDto {
    const { boardState, categories, currPhase, currPlayerId, currRound, phaseTimeUp } = session;
    return { boardState, categories, currPhase, currPlayerId, currRound, phaseTimeUp };
  }

  getPlayerStateMessage(session: GameSession): PlayerStateDto {
    return {
      players: [...session.activeClientStates.values()].map(({ id, nickname, score }) => ({
        id,
        nickname,
        score,
      })),
    };
  }

  getPromptStateMessage(session: GameSession): PromptStateDto {
    const { promptState, phaseTimeUp, currPhase } = session;
    const { category, prompt, responses, value } = promptState;

    return {
      phaseTimeUp,
      prompt: { category, prompt, responses, value },
      currPhase,
    };
  }

  getGameEndedMessage(session: GameSession): GameEndedDto {
    const gameStateMessage = this.getGameStateMessage(session);
    const playerStateMessage = this.getPlayerStateMessage(session);

    return {
      ...gameStateMessage,
      ...playerStateMessage,
      status: "ended",
    };
  }

  emitError(client: Socket, message: string) {
    client.emit("error", message);
  }

  getCurrentPlayerId(session: GameSession): number | null {
    const allClients = [...session.allClientStates.entries()];

    let currPlayerIdx = session.currPlayerIndex % allClients.length;
    let currPlayerEntry = allClients[currPlayerIdx];
    let iterations = 0;

    do {
      if (session.activeClientStates.has(currPlayerEntry[0])) {
        session.currPlayerIndex = currPlayerIdx;
        return currPlayerEntry[1].id;
      } else {
        currPlayerIdx = (currPlayerIdx + 1) % allClients.length;
        currPlayerEntry = allClients[currPlayerIdx];
        iterations++;
      }
    } while (iterations <= allClients.length);

    return null;
  }

  getClientFromUserId(userId: number): Socket | null {
    for (const [connectedClientId, connectedUserId] of this.connectedUsers.entries()) {
      if (connectedUserId === userId) {
        return this.server.sockets.sockets.get(connectedClientId) || null;
      }
    }

    return null;
  }

  async getUserAndGameFromClient(client: Socket): Promise<[User, Game] | [null, null]> {
    const errorResponse = [null, null] as [null, null];

    const userId = this.connectedUsers.get(client.id);
    if (!userId) {
      return errorResponse;
    }

    const user = await this.usersService.findOne({ id: userId });
    if (!user || !user.activeGameId) {
      return errorResponse;
    }

    const game = await this.gamesService.findOnePlayable(user.activeGameId, user.id);
    if (!game) {
      return errorResponse;
    }

    return [user, game];
  }

  async gamePhaseTransition(gameId: number, session: GameSession, toPhase: GameSession["currPhase"]) {
    clearTimeout(session.timeout);

    if (toPhase === "prompts") {
      if (session.promptsRemaining === 0) {
        await this.endGame(gameId, session, "No prompts remaining");
        return;
      }

      if (session.currPhase !== "lobby") {
        session.currPlayerIndex++;
      }

      const currPlayerId = this.getCurrentPlayerId(session);
      if (currPlayerId === null) {
        this.endGame(gameId, session, "All players left");
        return;
      }

      session.currPlayerId = currPlayerId;
      if (session.currPhase === "answers") {
        session.allClientStates.forEach((value) => {
          value.responseChosen = false;
        });
        session.currRound++;

        const playerStateMessage = this.getPlayerStateMessage(session);
        this.server.to(gameId.toString()).emit("player_state", playerStateMessage);
      }
      session.currPhase = "prompts";
      session.phaseTimeUp = add(new Date(), { seconds: 20 }).toISOString();

      const gameStateMessage = this.getGameStateMessage(session);
      this.server.to(gameId.toString()).emit("game_state", gameStateMessage);

      session.timeout = setTimeout(async () => {
        await this.gamePhaseTransition(gameId, session, "prompts");
      }, 20000);
    } else if (toPhase === "answers") {
      session.currPhase = "answers";
      session.phaseTimeUp = add(new Date(), { seconds: 20 }).toISOString();

      const promptStateMessage = this.getPromptStateMessage(session);
      this.server.to(gameId.toString()).emit("prompt_state", promptStateMessage);

      session.timeout = setTimeout(async () => {
        await this.gamePhaseTransition(gameId, session, "prompts");
      }, 20000);
    }
  }

  async endGame(gameId: number, session: GameSession, eventDetails?: string) {
    session.currPhase = "results";

    const gameEndedMessage = this.getGameEndedMessage(session);
    const gameIdStr = gameId.toString();

    this.server.to(gameIdStr).emit("game_ended", gameEndedMessage);

    setTimeout(() => {
      this.server.to(gameIdStr).disconnectSockets(true);
      this.gameSessions.delete(gameId);
    }, 10000);

    await this.gamesService.update({
      where: { id: gameId },
      data: {
        status: "ended",
        events: {
          create: {
            eventType: "game_ended",
            eventDetails,
          },
        },
      },
    });
  }
}
