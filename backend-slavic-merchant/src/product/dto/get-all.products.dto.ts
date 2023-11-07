import { IsOptional, IsEnum, IsString } from "class-validator";
import { PaginationDto } from "src/pagination/dto/pagination.dto";

export enum EnumProductsSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetAllProductsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EnumProductsSort)
  sort?: EnumProductsSort

  @IsOptional()
  @IsString()
  searchTerm?: string
}