import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get('paginated')
  async getAllProducts(@Query() filter?: QueryPaginationDto) {
    console.log('innnnnnn');
    return this.productsService.getAllProducts(filter);
  }

  // @Get(':id')
  // async getProductById(@Param('id') id: string) {
  //   return this.productsService.getProductById(Number(id));
  // }
}
