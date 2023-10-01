import Stack, { type StackProps } from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";

const Container = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    width: theme.breakpoints.values.lg,
    marginInline: "auto",
  },
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    paddingInline: theme.spacing(3),
  },
}));

export default function PageWrapper(props: StackProps) {
  return <Container {...props} />;
}
