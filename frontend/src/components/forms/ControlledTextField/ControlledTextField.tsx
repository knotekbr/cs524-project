import TextField from "@mui/material/TextField";

import { Controller } from "react-hook-form";

import type { ControlledTextFieldProps } from "./ControlledTextField.types";
import type { FieldValues } from "react-hook-form";

export default function ControlledTextField<T extends FieldValues>({
  control,
  name,
  ...inputProps
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...inputProps}
          {...field}
          error={!!error}
          helperText={error ? error.message : " "}
          data-testid={`controlled-text-field-${name}`}
        />
      )}
    />
  );
}
