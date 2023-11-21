import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, "saltedPassword"> | null> {
    const user = await this.usersService.findOne({ email });

    if (user && (await bcrypt.compare(password, user.saltedPassword))) {
      // eslint-disable-next-line
      const { saltedPassword, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
