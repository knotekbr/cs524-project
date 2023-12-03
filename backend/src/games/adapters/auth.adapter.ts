import { INestApplicationContext } from "@nestjs/common/interfaces";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { ServerOptions } from "socket.io";

export class AuthIoAdapter extends IoAdapter {
  private readonly authService: AuthService;
  private readonly usersService: UsersService;

  constructor(private app: INestApplicationContext) {
    super(app);

    this.authService = this.app.get(AuthService);
    this.usersService = this.app.get(UsersService);
  }

  createIOServer(port: number, options: Partial<ServerOptions> = {}): any {
    options.allowRequest = async (request, allowFn) => {
      const token = request.headers.authorization;
      const user = token && (await this.authService.verifyAuthToken(token));

      if (user) {
        return allowFn(null, true);
      }

      return allowFn("Unauthorized", false);
    };

    return super.createIOServer(port, options);
  }
}
