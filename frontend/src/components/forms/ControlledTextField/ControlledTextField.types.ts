import type { TextFieldProps } from "@mui/material";

import type { ControlledFieldProps } from "~types";

import type { FieldValues } from "react-hook-form";

export type ControlledTextFieldProps<T extends FieldValues = FieldValues> = ControlledFieldProps<T, TextFieldProps>;
