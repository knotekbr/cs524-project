import { Body, Controller, Get, Patch, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Auth } from "src/common/decorators/auth.decorator";
import { UpdateProfileDto } from "./dtos/UpdateProfileDto";
import * as bcrypt from "bcrypt";


@Controller("users")
@Auth()
export class UsersController {
  constructor(private UsersService: UsersService) { } //user defined functio in users.service.ts

  @Get("profle")
  getProfile(@Request() req) {
    return req.user;

  }

  @Patch("profile")
  async updateProfile(@Request() req, @Body() body: Partial<UpdateProfileDto>) {

    const { nickname, password, newPassword } = body;
    const id: number = req.user.id;

    let newSaltedPassword: string | undefined = undefined;

    if (password && newPassword) {
      const user = await this.UsersService.findOne({ id });

      if (user && (await bcrypt.compare(password, user.saltedPassword))) {

        newSaltedPassword = await bcrypt.hash(newPassword, 10);

      }
    }

    const { saltedPassword, ...result } = await this.UsersService.update({
      where: { id },
      data: {
        nickname,
        saltedPassword: newSaltedPassword,

      },
    });

    return result;
  }



}