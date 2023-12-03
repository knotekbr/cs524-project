import { baseApi } from "~api";

import {
  activeGamesEndpoint,
  allGamesEndpoint,
  joinGameEndpoint,
  pauseGameEndpoint,
  showGameEndpoint,
  startGameEndpoint,
} from "./games.defs";

const { get: getAllGames, post: createGame } = allGamesEndpoint;
const { get: getActiveGames } = activeGamesEndpoint;
const { get: getGame } = showGameEndpoint;
const { post: joinGame } = joinGameEndpoint;
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
    joinGame: joinGame.builder(build)({
      query: joinGame.defaultQuery,
      transformResponse: joinGame.transformer,
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
  useGetGameQuery,
  useJoinGameMutation,
  useLazyGetActiveGamesQuery,
  usePauseGameMutation,
  useStartGameMutation,
} = gamesApi;
