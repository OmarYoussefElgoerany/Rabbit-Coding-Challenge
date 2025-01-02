import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';
import {
  PaginateOutput,
  paginate,
  paginateOutput,
} from 'src/utils/pagination.utils';
import { TopProductsDto } from './dto/top-products.dto';

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
    return paginateOutput<ProductDto>(products, total, query);
  }
  // async findById(id: number): Promise<ProductDto | null> {
  //   return this.prisma.product.findUnique({
  //     where: { id },
  //   });
  // }
  async getTopProducts(area: string) {
    return await this.prisma.$queryRaw<TopProductsDto[]>`
          SELECT 
            p.id, 
            p.name, 
            p.category
          FROM 
            "Product" p
          JOIN 
            "OrderItem" oi ON p.id = oi."productId"
          WHERE 
            p.area = ${area}
          GROUP BY 
            p.id, p.name, p.category
          ORDER BY 
            SUM(oi.quantity) DESC
          LIMIT 10;
        `;
  }
}
