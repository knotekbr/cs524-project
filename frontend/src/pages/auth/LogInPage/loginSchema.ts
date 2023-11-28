import * as yup from "yup";

import type { LoginDto } from "~types";

import type { ObjectSchema } from "yup";

export const loginSchema: ObjectSchema<LoginDto> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export function loginSchemaDefaults(value: Partial<LoginDto> = {}): LoginDto {
  return {
    email: value.email ?? "",
    password: value.password ?? "",
  };
}
