import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_SECRET } from "src/common/constants";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne({ id: payload.sub ?? -1 });

    if (!user) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line
    const { saltedPassword, ...result } = user;
    return result;
  }
}
