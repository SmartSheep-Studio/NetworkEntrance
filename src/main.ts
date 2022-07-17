import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.setGlobalPrefix("api");

  await app.listen(3981);
}
bootstrap();
