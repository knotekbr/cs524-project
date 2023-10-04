import Typography from "@mui/material/Typography";

import { Outlet } from "react-router-dom";

import { PageWrapper } from "~components/layout/PageWrapper";

export default function AdminBasePage() {
  return (
    <PageWrapper>
      <Typography>Admin - Wrapper</Typography>
      <Outlet />
    </PageWrapper>
  );
}
