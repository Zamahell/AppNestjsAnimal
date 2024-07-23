import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 1234,
      database: process.env.DB_NAME || 'animal',
      username: process.env.DB_USER|| 'sa',
      password: process.env.DB_PASSWORD || '123456Braulio*',
      schema: process.env.DB_SCHEMA || 'dbo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      extra: {
        trustServerCertificate: true,
      }
    }),
    AnimalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
