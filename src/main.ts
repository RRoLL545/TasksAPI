import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "node:process";


async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Управление задачами с дополнительными функциями')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('IQ Group')
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',)
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup(
    '/api/docs',
    app,
    document,
  );

  await app.listen(
    PORT,
    () => console.log(`Server started on port ${PORT}`),
  );
}

start()
  .then();