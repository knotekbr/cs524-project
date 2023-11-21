import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../common/guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { Role } from "src/common/enums/role.enum";
import { Auth } from "src/common/decorators/auth.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get("profile")
  @Auth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Get("profile-admin")
  @Auth(Role.Admin)
  getProfileAdmin(@Request() req) {
    return req.user;
  }
}
