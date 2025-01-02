/* eslint-disable prettier/prettier */
import { TestingModule, Test } from '@nestjs/testing';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from 'src/product/dto/product.dto';
import { TopProductsDto } from 'src/product/dto/top-products.dto';
import { ProductRepository } from 'src/product/product.repository';


describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  let prismaService: PrismaService;

  const mockProducts: ProductDto[] = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Category 1',
      area: 'Area 1',
      createdAt: new Date('2025-01-01'),
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Category 2',
      area: 'Area 1',
      createdAt: new Date('2025-01-02'),
    },
  ];

  const mockTotal = 2;
  const mockTopProducts: TopProductsDto[] = [
    { id: 1, name: 'Product 1', category: 'Category 1' },
    { id: 2, name: 'Product 2', category: 'Category 2' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepository, PrismaService],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(productRepository).toBeDefined();
  });

  describe('findAllPaginated', () => {
    it('should return paginated products', async () => {
      const query: QueryPaginationDto = { page: '1', size: '10' };

      // Mocking Prisma methods
      prismaService.product.findMany = jest
        .fn()
        .mockResolvedValue(mockProducts);
      prismaService.product.count = jest.fn().mockResolvedValue(mockTotal);

      const result = await productRepository.findAllPaginated(query);

      expect(result.data).toEqual(mockProducts);
      expect(result.meta.total).toEqual(mockTotal);
      expect(prismaService.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 10,
        }),
      );
      expect(prismaService.product.count).toHaveBeenCalled();
    });
  });

  describe('getTopProducts', () => {
    it('should return top products for a given area', async () => {
      const area = 'Area 1';

      // Mocking Prisma method for raw query
      prismaService.$queryRaw = jest.fn().mockResolvedValue(mockTopProducts);

      const result = await productRepository.getTopProducts(area);

      expect(result).toEqual(mockTopProducts);
      expect(prismaService.$queryRaw).toHaveBeenCalledWith(
        expect.anything(),
        area,
      );
    });
  });
});
