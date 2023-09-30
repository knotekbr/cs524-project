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

const ToolbarGroup = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export default function NavBar() {
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
          <Typography variant="h5">Project ALEX</Typography>
          <Button variant="contained">New Game</Button>
          <Button variant="contained">Past Games</Button>
          <Button variant="contained" onClick={openAdminMenu}>
            Admin
          </Button>
          <Menu anchorEl={adminMenuAnchor} open={adminMenuOpen} onClose={closeAdminMenu}>
            <MenuItem>Question Management</MenuItem>
            <MenuItem>Game Management</MenuItem>
          </Menu>
        </ToolbarGroup>
        <ToolbarGroup>
          <Typography>Brandon</Typography>
          <IconButton color="inherit">
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
