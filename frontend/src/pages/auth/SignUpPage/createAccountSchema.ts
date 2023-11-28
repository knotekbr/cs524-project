import * as yup from "yup";

import type { CreateAccountSchema } from "~types";

import type { ObjectSchema } from "yup";

export const createAccountSchema: ObjectSchema<CreateAccountSchema> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function passwordsMatch(value) {
      return value === this.parent.password;
    })
    .required(),
  nickname: yup.string().required(),
});

export function createAccountSchemaDefaults(value: Partial<CreateAccountSchema> = {}): CreateAccountSchema {
  return {
    email: value.email ?? "",
    password: value.password ?? "",
    confirmPassword: value.confirmPassword ?? "",
    nickname: value.nickname ?? "",
  };
}
