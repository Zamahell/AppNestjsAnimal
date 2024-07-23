import { BlobOptions } from "buffer";
import { IsBoolean, IsString, MinLength } from "class-validator";

export class CreateAnimalDto {

    @IsString()
    @MinLength(2)
    name : string;


    @IsBoolean()
    adopted? : number = 0;
}
