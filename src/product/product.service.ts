/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';
import { PaginateOutput } from 'src/utils/pagination.utils';
import { TopProductsDto } from './dto/top-products.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async getAllProducts(
    query?: QueryPaginationDto,
  ): Promise<PaginateOutput<ProductDto>> {
    return this.productsRepository.findAllPaginated(query);
  }

  
  async getTopProductsByArea(area: string): Promise<TopProductsDto[]> {
    // Validate the area
    if (!area || area.length < 2 || area.length > 10) {
      throw new BadRequestException(
        'Invalid area value. The area must be a non-empty string between 2 and 10 characters.',
      );
    }
      return await this.productsRepository.getTopProducts(area);
}}
