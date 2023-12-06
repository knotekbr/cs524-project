import { baseApi } from "~api";
import { SocketSingleton } from "~app/services/SocketSingleton";
import { showSnackbar } from "~state/slices/uiSlice";
import { AppRootState } from "~state/store";

import {
  activeGamesEndpoint,
  allGamesEndpoint,
  gameplayEndpoint,
  pauseGameEndpoint,
  showGameEndpoint,
  startGameEndpoint,
} from "./games.defs";

import { GameEndedDto, GameStateDto, PlayerStateDto, PromptStateDto } from "~types";

const { get: getAllGames, post: createGame } = allGamesEndpoint;
const { get: getActiveGames } = activeGamesEndpoint;
const { get: getGame } = showGameEndpoint;
const { get: getGameplayState } = gameplayEndpoint;
const { post: startGame } = startGameEndpoint;
const { post: pauseGame } = pauseGameEndpoint;

export const gamesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllGames: getAllGames.builder(build)({
      query: getAllGames.defaultQuery,
      transformResponse: getAllGames.transformer,
    }),
    createGame: createGame.builder(build)({
      query: createGame.defaultQuery,
      transformResponse: createGame.transformer,
    }),
    getActiveGames: getActiveGames.builder(build)({
      query: getActiveGames.defaultQuery,
      transformResponse: getActiveGames.transformer,
    }),
    getGame: getGame.builder(build)({
      query: getGame.defaultQuery,
      transformResponse: getGame.transformer,
    }),
    getGameplayState: getGameplayState.builder(build)({
      query: getGameplayState.defaultQuery,
      transformResponse: getGameplayState.transformer,
      async onCacheEntryAdded(
        { urlParams: { id: gameId } },
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getState, updateCachedData }
      ) {
        try {
          const {
            auth: { token },
          } = getState() as AppRootState;
          await cacheDataLoaded;

          const ws = SocketSingleton.instance(token);

          if (SocketSingleton.connected) {
            ws.emit("join_game", { gameId });
          } else {
            ws.on("connection_established", () => {
              ws.emit("join_game", { gameId });
            });
          }

          ws.on("game_state", (message: GameStateDto) => {
            updateCachedData((draft) => {
              Object.assign(draft, message);
            });
          });

          ws.on("player_state", (message: PlayerStateDto) => {
            updateCachedData((draft) => {
              Object.assign(draft, message);
            });
          });

          ws.on("prompt_state", (message: PromptStateDto) => {
            updateCachedData((draft) => {
              Object.assign(draft, message);
            });
          });

          ws.on("game_ended", (message: GameEndedDto) => {
            updateCachedData((draft) => {
              Object.assign(draft, message);
            });
            SocketSingleton.cleanup();
          });

          ws.on("error", (message: string) => {
            dispatch(
              showSnackbar({
                message: message || "An unknown error has occurred",
                severity: "error",
              })
            );
          });

          await cacheEntryRemoved;

          SocketSingleton.cleanup();
        } catch {
          // What to do?
        }
      },
    }),
    startGame: startGame.builder(build)({
      query: startGame.defaultQuery,
      transformResponse: startGame.transformer,
    }),
    pauseGame: pauseGame.builder(build)({
      query: pauseGame.defaultQuery,
      transformResponse: pauseGame.transformer,
    }),
  }),
});

export const {
  useCreateGameMutation,
  useGetActiveGamesQuery,
  useGetAllGamesQuery,
  useGetGameplayStateQuery,
  useGetGameQuery,
  useLazyGetActiveGamesQuery,
  useLazyGetGameplayStateQuery,
  usePauseGameMutation,
  useStartGameMutation,
} = gamesApi;
