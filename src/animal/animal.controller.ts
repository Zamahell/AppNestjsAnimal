import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PaginationDto } from 'src/common';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.animalService.findAll(paginationDto);
  }

  @Get("/notAdopted")
  findAllNon(@Query() paginationDto:PaginationDto){
    return this.animalService.findAllNotAdopted(paginationDto);
  }



  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animalService.findOne(id);
  }

  // Soft delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.animalService.remove(id);
  }
}
