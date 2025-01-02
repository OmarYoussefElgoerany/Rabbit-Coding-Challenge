import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';
import { PaginateOutput } from 'src/utils/pagination.utils';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async getAllProducts(
    query?: QueryPaginationDto,
  ): Promise<PaginateOutput<ProductDto>> {
    return this.productsRepository.findAllPaginated(query);
  }
}
