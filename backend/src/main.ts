import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AuthIoAdapter } from "./games/adapters/auth.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "*" });
  app.useWebSocketAdapter(new AuthIoAdapter(app));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
