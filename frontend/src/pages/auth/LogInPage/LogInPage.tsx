import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { NavLink } from "react-router-dom";

import { PageWrapper } from "~components/layout/PageWrapper";

export default function LogInPage() {
  return (
    <PageWrapper alignItems="center" gap={1}>
      <Card sx={{ width: 0.5 }}>
        <CardHeader title="Log In" />
        <CardContent>
          <Stack gap={1} mt={-3}>
            <TextField label="Email Address" />
            <TextField label="Password" />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button>Log In</Button>
        </CardActions>
      </Card>
      <NavLink to="/signup" style={{ textDecoration: "none" }}>
        <Typography color="primary">Click here to create an account</Typography>
      </NavLink>
    </PageWrapper>
  );
}
