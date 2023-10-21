import Stack, { type StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { NavLink } from "react-router-dom";

import type { NestedNavBarProps } from "./NestedNavBar.types";

const NestedNavLink = styled(NavLink)(({ theme }) => ({
  display: "block",
  flex: 1,
  textDecoration: "none",
  color: theme.palette.primary.main,
  overflow: "hidden",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },
  "&:first-of-type": {
    borderTopLeftRadius: "5px",
  },
  "&:last-of-type": {
    borderTopRightRadius: "5px",
  },
}));

const NavLinkContents = styled(Stack as React.ComponentType<StackProps & { isActive?: boolean; isPending?: boolean }>, {
  shouldForwardProp: (propName) => propName !== "isActive" && propName !== "isPending",
})(({ isActive, theme }) => ({
  alignItems: "center",
  paddingBlock: 5,
  ...(isActive && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  }),
  ...(!isActive && {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  }),
}));

export default function NestedNavBar({ links }: NestedNavBarProps) {
  return (
    <Stack direction="row" width={1}>
      {links.map(({ label, to }) => (
        <NestedNavLink to={to} key={to}>
          {({ isActive }) => (
            <NavLinkContents isActive={isActive}>
              <Typography variant="button" fontSize={16} fontWeight="bold">
                {label}
              </Typography>
            </NavLinkContents>
          )}
        </NestedNavLink>
      ))}
    </Stack>
  );
}
