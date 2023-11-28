import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

import { useLogInMutation } from "~api/request/auth";
import { ControlledTextField } from "~components/forms/ControlledTextField";
import { PageWrapper } from "~components/layout/PageWrapper";
import { useFeedback, snackbarOptions } from "~components/utility/FeedbackProvider";

import { loginSchema, loginSchemaDefaults } from "./loginSchema";

import type { LoginDto } from "~types";

import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";

export default function LogInPage() {
  const navigate = useNavigate();
  const { showSnackbar } = useFeedback();
  const [logIn, { isLoading }] = useLogInMutation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: loginSchemaDefaults(),
  });

  const onSubmit: SubmitHandler<LoginDto> = (data) => {
    logIn({ bodyParams: data })
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  const onError: SubmitErrorHandler<LoginDto> = () => {
    showSnackbar(snackbarOptions.formErrors());
  };

  return (
    <PageWrapper alignItems="center" gap={1}>
      <Card sx={{ width: 0.5 }}>
        <CardHeader title="Log In" />
        <CardContent>
          <Stack gap={1} mt={-3}>
            <ControlledTextField control={control} name="email" label="Email Address" />
            <ControlledTextField control={control} name="password" label="Password" type="password" />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button onClick={handleSubmit(onSubmit, onError)} disabled={isLoading}>
            Log In
          </Button>
        </CardActions>
      </Card>
      <NavLink to="/signup" style={{ textDecoration: "none" }}>
        <Typography color="primary">Click here to create an account</Typography>
      </NavLink>
    </PageWrapper>
  );
}
