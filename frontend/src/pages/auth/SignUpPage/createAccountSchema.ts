import * as yup from "yup";

import type { CreateAccountDto } from "~types";

import type { ObjectSchema } from "yup";

export const createAccountSchema: ObjectSchema<CreateAccountDto> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  nickname: yup.string().required(),
});

export function createAccountSchemaDefaults(value: Partial<CreateAccountDto> = {}): CreateAccountDto {
  return {
    email: value.email ?? "",
    password: value.password ?? "",
    nickname: value.nickname ?? "",
  };
}
