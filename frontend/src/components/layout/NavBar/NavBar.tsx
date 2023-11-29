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
import { useAuth } from "~components/auth/AuthProvider";

export default function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logOut } = useAuth();

  return (
    <AppBar>
      <Toolbar>
        <Link to="/">
          <Image src={logo} className="nav-bar-logo" />
        </Link>
        {isLoggedIn ? (
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
              <Typography style={{ userSelect: "none" }}>{user.nickname}</Typography>
              <Button variant="navBarIcon" onClick={() => navigate("settings")}>
                <SettingsIcon />
              </Button>
              <Button variant="navBarIcon" onClick={logOut}>
                <LogoutIcon />
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack className="nav-bar-button-row" sx={{ flexDirection: "row-reverse !important" }}>
            <Stack className="nav-bar-button-group">
              <Button onClick={() => navigate("/login")}>Log In</Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </Stack>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
