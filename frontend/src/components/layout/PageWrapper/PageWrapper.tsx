import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";

import type { PageWrapperProps } from "./PageWrapper.types";

const RootContainer = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    width: theme.breakpoints.values.lg,
    marginInline: "auto",
  },
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    paddingInline: theme.spacing(3),
  },
}));

export default function PageWrapper({ nested, ...restProps }: PageWrapperProps) {
  if (nested) {
    return <Stack {...restProps} />;
  }

  return <RootContainer {...restProps} />;
}
