import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { add } from "date-fns";
import { CreateAccountDto } from "./dtos/CreateAccountDto";
import { UserDto } from "src/users/dtos/UserDto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, "saltedPassword"> | null> {
    const user = await this.usersService.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.saltedPassword))) {
      // eslint-disable-next-line
      const { saltedPassword, ...result } = user;
      return result;
    }

    return null;
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    const { email: rawEmail, nickname, password } = createAccountDto;
    const email = rawEmail.toLowerCase();

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      saltedPassword: passwordHash,
      nickname,
    });

    // eslint-disable-next-line
    const { saltedPassword, ...userResult } = user;
    const payload = { email: user.email, sub: user.id };

    return {
      user: userResult,
      token: this.jwtService.sign(payload),
      tokenExpiration: add(new Date(), { days: 1 }),
    };
  }

  async login(user: any) {
    const payload = { email: user.email.toLowerCase(), sub: user.id };

    return {
      user,
      token: this.jwtService.sign(payload),
      tokenExpiration: add(new Date(), { days: 1 }),
    };
  }

  async verifyAuthToken(authToken: string): Promise<UserDto | null> {
    try {
      const rawToken = authToken.startsWith("Bearer ") ? authToken.slice(7) : authToken;
      const payload = this.jwtService.verify(rawToken);

      if (payload && "sub" in payload && typeof payload.sub === "number") {
        const user = await this.usersService.findOne({ id: payload.sub });
        if (user) {
          // eslint-disable-next-line
          const { saltedPassword, ...result } = user;
          return result;
        }
      }
    } catch {
      return null;
    }

    return null;
  }
}
