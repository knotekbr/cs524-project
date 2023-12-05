import * as yup from "yup";

import { InvitePlayerDto } from "~types";

import type { ObjectSchema } from "yup";

export const inviteSchema: ObjectSchema<InvitePlayerDto> = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export function inviteSchemaDefaults(): InvitePlayerDto {
  return {
    email: "",
  };
}
