import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import cors from 'cors';
import * as path from 'path';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, './tmp/my-uploads'));
  await app.listen(3001);

  app.enableCors({
    origin: 'http://localhost:3000/', // Replace this with the allowed origin(s) or '*' for all origins
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ], // Allowed HTTP headers
    optionsSuccessStatus: 204,
    credentials: true, // Set to true if you want to allow credentials (e.g., cookies) to be sent with the request
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
