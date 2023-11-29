import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";

const FormColumn = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

export default FormColumn;
