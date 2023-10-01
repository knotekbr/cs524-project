import type { ButtonPropsVariantOverrides } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    navBar: true;
    navBarIcon: true;
  }
}
