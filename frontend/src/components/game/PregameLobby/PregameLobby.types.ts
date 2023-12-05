import { GameplayState, InvitePlayerDto } from "~types";

export type PregameLobbyProps = {
  players: GameplayState["players"];
  gameCreatorId: number;
  onInvite: (message: InvitePlayerDto) => void;
  onStartGame: () => void;
};
