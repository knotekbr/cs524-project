import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { add } from "date-fns";
import { CreateAccountDto } from "./dtos/CreateAccountDto";

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

  async createAccount(createAccountDto: CreateAccountDto) {
    const { email, nickname, password } = createAccountDto;

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
    const payload = { email: user.email, sub: user.id };

    return {
      user,
      token: this.jwtService.sign(payload),
      tokenExpiration: add(new Date(), { days: 1 }),
    };
  }
}
