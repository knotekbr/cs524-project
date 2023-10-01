import Typography from "@mui/material/Typography";

import { Outlet } from "react-router-dom";

import { PageWrapper } from "~components/layout/PageWrapper";

export default function PlayBasePage() {
  return (
    <PageWrapper>
      <Typography>Play - Wrapper</Typography>
      <Outlet />
    </PageWrapper>
  );
}
