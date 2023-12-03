import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import { useCreateGameMutation } from "~api/request/games";
import { PageWrapper } from "~components/layout/PageWrapper";

export default function CreateGamePage() {
  const navigate = useNavigate();
  const [createGame] = useCreateGameMutation();

  const handleCreateGame = () => {
    createGame()
      .unwrap()
      .then((game) => {
        navigate(`/play/${game.id}`);
      });
  };
  return (
    <PageWrapper nested pt={2} alignItems="center">
      <Button onClick={handleCreateGame}>New Game</Button>
    </PageWrapper>
  );
}
