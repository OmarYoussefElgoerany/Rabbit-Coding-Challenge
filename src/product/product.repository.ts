import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';
import {
  PaginateOutput,
  paginate,
  paginateOutput,
} from 'src/utils/pagination.utils';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPaginated(
    query?: QueryPaginationDto,
  ): Promise<PaginateOutput<ProductDto>> {
    const [products, total] = await Promise.all([
      await this.prisma.product.findMany({
        ...paginate(query),
      }),
      await this.prisma.product.count(),
    ]);
    console.log("in  serviceee repooooooo");
    return paginateOutput<ProductDto>(products, total, query);
  }
  async findById(id: number): Promise<ProductDto | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: ProductDto): Promise<ProductDto> {
    return this.prisma.product.create({ data });
  }
}
