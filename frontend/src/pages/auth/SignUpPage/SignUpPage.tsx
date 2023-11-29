import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

import { useCreateAccountMutation } from "~api/request/auth";
import { ControlledTextField } from "~components/forms/ControlledTextField";
import { FormRow } from "~components/forms/structure";
import { PageWrapper } from "~components/layout/PageWrapper";
import { snackbarOptions, useFeedback } from "~components/utility/FeedbackProvider";

import { createAccountSchema, createAccountSchemaDefaults } from "./createAccountSchema";

import type { CreateAccountSchema } from "~types";

import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { showSnackbar } = useFeedback();
  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createAccountSchema),
    mode: "onChange",
    defaultValues: createAccountSchemaDefaults(),
  });

  const onSubmit: SubmitHandler<CreateAccountSchema> = (data) => {
    const { confirmPassword, ...reqBody } = data;

    createAccount({ bodyParams: reqBody })
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  const onError: SubmitErrorHandler<CreateAccountSchema> = () => {
    showSnackbar(snackbarOptions.formErrors());
  };

  return (
    <PageWrapper alignItems="center" gap={1}>
      <Card sx={{ width: 0.5 }}>
        <CardHeader title="Sign Up" />
        <CardContent>
          <Stack gap={1} mt={-3}>
            <FormRow>
              <ControlledTextField control={control} name="email" label="Email Address" />
              <ControlledTextField control={control} name="nickname" label="Nickname" />
            </FormRow>
            <FormRow>
              <ControlledTextField control={control} name="password" label="Password" type="password" />
              <ControlledTextField control={control} name="confirmPassword" label="Confirm Password" type="password" />
            </FormRow>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button onClick={handleSubmit(onSubmit, onError)} disabled={isLoading}>
            Sign Up
          </Button>
        </CardActions>
      </Card>
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <Typography color="primary">Click here to log in to an existing account</Typography>
      </NavLink>
    </PageWrapper>
  );
}
