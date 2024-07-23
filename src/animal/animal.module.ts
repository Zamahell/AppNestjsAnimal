import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';

@Module({
  controllers: [AnimalController],
  providers: [AnimalService],
  imports: [TypeOrmModule.forFeature([Animal])]
})
export class AnimalModule {}
