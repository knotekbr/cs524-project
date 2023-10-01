import { useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Link, useNavigate } from "react-router-dom";

import logo from "~assets/logo.png";
import { Image } from "~components/atoms/Image";

export default function NavBar() {
  const navigate = useNavigate();

  const [adminMenuAnchor, setAdminMenuAnchor] = useState<null | HTMLElement>(null);
  const adminMenuOpen = Boolean(adminMenuAnchor);

  const openAdminMenu: React.MouseEventHandler<HTMLElement> = (e) => {
    setAdminMenuAnchor(e.currentTarget);
  };
  const closeAdminMenu = () => {
    setAdminMenuAnchor(null);
  };

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
            <Button variant="navBar" onClick={openAdminMenu}>
              Admin
            </Button>
            <Menu anchorEl={adminMenuAnchor} open={adminMenuOpen} onClick={closeAdminMenu} onClose={closeAdminMenu}>
              <MenuItem onClick={() => navigate("admin/questions")}>Question Management</MenuItem>
              <MenuItem onClick={() => navigate("admin/games")}>Game Management</MenuItem>
            </Menu>
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
