import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../common/guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { CreateAccountDto } from "./dtos/CreateAccountDto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("create-account")
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.createAccount(createAccountDto);
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
