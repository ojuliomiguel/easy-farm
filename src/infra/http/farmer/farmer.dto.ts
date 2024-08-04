import { IsNotEmpty, IsString, IsOptional, ValidateNested, ArrayNotEmpty, IsArray, IsNumber, Min, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFarmerDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cpf: string | null;

  @IsOptional()
  @IsString()
  cnpj: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FarmDTO)
  farms: FarmDTO[];
}


export class FarmAreaDTO {
  @IsNumber()
  @Min(1)
  totalArea: number;

  @IsNumber()
  @Min(1)
  cultivableArea: number;

  @IsNumber()
  @Min(1)
  vegetationArea: number;
}

export class CultivationAreaDto {

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;
}


export class FarmDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => FarmAreaDTO)
  farmArea: FarmAreaDTO;

  @ValidateNested()
  @Type(() => CultivationAreaDto)
  cultivationArea: CultivationAreaDto;
}



