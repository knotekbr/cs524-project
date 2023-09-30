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
import styled from "@mui/material/styles/styled";

import { Link, useNavigate } from "react-router-dom";

const LogoLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  userSelect: "none",
});

const ToolbarGroup = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const ToolbarIconButton = styled(Button)({
  borderRadius: "100%",
  minWidth: 0,
  padding: 6,
});

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
          <LogoLink to="/">
            <Typography variant="h5">Project ALEX</Typography>
          </LogoLink>
          <Button onClick={() => navigate("play")}>Play</Button>
          <Button onClick={() => navigate("history")}>History</Button>
          <Button onClick={openAdminMenu}>Admin</Button>
          <Menu anchorEl={adminMenuAnchor} open={adminMenuOpen} onClick={closeAdminMenu} onClose={closeAdminMenu}>
            <MenuItem onClick={() => navigate("admin/questions")}>Question Management</MenuItem>
            <MenuItem onClick={() => navigate("admin/games")}>Game Management</MenuItem>
          </Menu>
        </ToolbarGroup>
        <ToolbarGroup>
          <Typography style={{ userSelect: "none" }}>Brandon</Typography>
          <ToolbarIconButton onClick={() => navigate("settings")}>
            <SettingsIcon />
          </ToolbarIconButton>
          <ToolbarIconButton>
            <LogoutIcon />
          </ToolbarIconButton>
        </ToolbarGroup>
      </Toolbar>
    </AppBar>
  );
}
