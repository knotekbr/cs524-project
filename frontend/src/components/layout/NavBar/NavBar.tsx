import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Link, useNavigate } from "react-router-dom";

import logo from "~assets/logo.png";
import { Image } from "~components/atoms/Image";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <AppBar>
      <Toolbar>
        <Link to="/">
          <Image src={logo} className="nav-bar-logo" />
        </Link>
        <Stack className="nav-bar-button-row">
          <Stack className="nav-bar-button-group">
            <Button variant="navBar" onClick={() => navigate("play")}>
              Play
            </Button>
            <Button variant="navBar" onClick={() => navigate("history")}>
              History
            </Button>
            <Button variant="navBar" onClick={() => navigate("admin")}>
              Admin
            </Button>
          </Stack>
          <Stack className="nav-bar-button-group">
            <Typography style={{ userSelect: "none" }}>Brandon</Typography>
            <Button variant="navBarIcon" onClick={() => navigate("settings")}>
              <SettingsIcon />
            </Button>
            <Button variant="navBarIcon">
              <LogoutIcon />
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
