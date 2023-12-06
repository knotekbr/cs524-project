import { GameDto } from "~types";

export type GameEventsDialogProps = {
  open: boolean;
  onClose: () => void;
  game: GameDto;
};
