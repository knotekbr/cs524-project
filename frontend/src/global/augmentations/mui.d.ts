import type {
  ButtonPropsVariantOverrides,
  TypographyPropsVariantOverrides,
  TypographyVariants,
  TypographyVariantsOptions,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    categoryAnswer: React.CSSProperties;
    categoryName: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    categoryAnswer?: React.CSSProperties;
    categoryName?: React.CSSProperties;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    navBar: true;
    navBarIcon: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    categoryAnswer: true;
    categoryName: true;
  }
}
