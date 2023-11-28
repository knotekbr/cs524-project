import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";

const FormRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
}));

export default FormRow;
