import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EquiposModule } from './equipos/equipos.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql' as const,
        host: config.get<string>('MYSQL_HOST', 'localhost'),
        port: Number(config.get<string>('MYSQL_PORT', '3306')),
        username: config.get<string>('MYSQL_USER', 'root'),
        password: config.get<string>('MYSQL_PASSWORD', ''),
        database: config.get<string>(
          'MYSQL_DATABASE',
          'inventario_tecnologico',
        ),
        autoLoadEntities: true,
        synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
      }),
    }),
    EquiposModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
