import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";

import { Outlet } from "react-router-dom";

import { NavBar } from "~components/layout/NavBar";

const MainContainer = styled("main")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  overflowX: "hidden",
  overflowY: "auto",
});

export default function App() {
  return (
    <Stack height="100vh" width="100vw">
      <NavBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Stack>
  );
}
