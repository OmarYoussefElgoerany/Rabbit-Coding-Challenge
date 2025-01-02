/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}
  @Get('top-products') 
  async getTopProductsByArea(@Query('area')
area: string) {
    return this.productsService.getTopProductsByArea(area);
  }


  @Get('paginated')
  async getAllProducts(@Query() filter?: QueryPaginationDto) {
    return this.productsService.getAllProducts(filter);
  }

}
