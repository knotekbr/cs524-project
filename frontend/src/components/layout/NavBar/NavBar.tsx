import { useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

import { Link, useNavigate } from "react-router-dom";

const ToolbarGroup = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
}));

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
        <ToolbarGroup>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h5">Project ALEX</Typography>
          </Link>
          <Button variant="contained" onClick={() => navigate("play")}>
            New Game
          </Button>
          <Button variant="contained" onClick={() => navigate("history")}>
            Past Games
          </Button>
          <Button variant="contained" onClick={openAdminMenu}>
            Admin
          </Button>
          <Menu anchorEl={adminMenuAnchor} open={adminMenuOpen} onClick={closeAdminMenu} onClose={closeAdminMenu}>
            <MenuItem onClick={() => navigate("admin/questions")}>Question Management</MenuItem>
            <MenuItem onClick={() => navigate("admin/games")}>Game Management</MenuItem>
          </Menu>
        </ToolbarGroup>
        <ToolbarGroup>
          <Typography style={{ userSelect: "none" }}>Brandon</Typography>
          <IconButton color="inherit" onClick={() => navigate("settings")}>
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    </AppBar>
  );
}
