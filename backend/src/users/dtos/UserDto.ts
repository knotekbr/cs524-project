import { UserRole } from "@prisma/client";

export class UserDto {
  id: number;
  email: string;
  nickname: string;
  role: UserRole;
  joined: Date;
  activeGameId: number | null;
}
