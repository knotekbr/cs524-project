import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guards/roles.guard";

export function Auth(...roles: Role[]) {
  if (roles.length === 0) {
    return applyDecorators(UseGuards(JwtAuthGuard));
  }

  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
}
