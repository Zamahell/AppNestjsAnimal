import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common';

@Injectable()
export class AnimalService {

  private readonly logger = new Logger('AnimalService')
  
  

  constructor(
    @InjectRepository(Animal) private readonly animalRepository: Repository<Animal>
  ){}

  async create(createAnimalDto: CreateAnimalDto) {
    try {
      const animalSave = await this.animalRepository.save(createAnimalDto)
      return animalSave; 
    } catch (error) {
      throw new HttpException('Bad Request Mi chan', HttpStatus.BAD_REQUEST)
    } 
  }

  async findAll( paginationDto:PaginationDto) {
    const {page = 1, limit= 10} = paginationDto;
    
    try {
      const [animals, total] = await this.animalRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });
  
      return {
        data: animals,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new InternalServerErrorException('Problem with findAll Animals')
    }
  }

  async findAllNotAdopted(paginationDto:PaginationDto){
    const {page = 1, limit= 10} = paginationDto;

    try {
      const [animals, total] = await this.animalRepository.findAndCount({
        where: {adopted: 0},
        take: limit,
        skip: (page - 1) * limit,
      });
  
      return {
        data: animals,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new InternalServerErrorException('Problem with findAll Animals')
    }

  }

  async findOne(id: number) {
    const animal = await this.animalRepository.findOne({where: {id}})

    if(!animal){
      throw new NotFoundException(`Animal not found with id ${id}`)
    }
    return animal;
  }


  // Soft delete
  async remove(id: number) {

    await this.findOne(id)
    
    try {
      const updatedAnimal = await this.animalRepository.update(id, {
        adopted: 1,
      });
  
      return updatedAnimal;
    } catch (error) {
     throw new BadRequestException() 
    }
    
  }



}
