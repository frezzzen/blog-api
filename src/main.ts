import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  let httpsOptions;

  console.log('Proccess', JSON.stringify(process.env, null, 2));
  if (process.env.MODE === 'production') {
    httpsOptions = {
      key: fs.readFileSync(
        '/etc/letsencrypt/live/blog.frezzzen.com/privkey.pem',
      ),
      cert: fs.readFileSync(
        '/etc/letsencrypt/live/blog.frezzzen.com/fullchain.pem',
      ),
    };
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Blog API')
    .setVersion('1.0')
    .addServer(process.env.MODE === 'production' ? 'api' : '')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    useGlobalPrefix: true,
    url: '/api',
    swaggerUrl: '/api',
  });

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
