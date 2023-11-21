import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { PageWrapper } from "~components/layout/PageWrapper";

export default function JoinGamePage() {
  return (
    <PageWrapper nested>
      <Typography>Play - Join Game</Typography>
      <Link to="/play/5">Active Game</Link>
    </PageWrapper>
  );
}
