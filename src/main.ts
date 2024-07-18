import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerWinston } from './logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: new LoggerWinston()});

  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('API para manejar tareas')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors(); // Esto habilita que el front se comunique con el backend
  await app.listen(3000);
  console.log('Server on port 3000');
}
bootstrap();
