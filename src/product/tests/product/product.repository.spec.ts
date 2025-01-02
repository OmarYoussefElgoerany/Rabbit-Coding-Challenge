/* eslint-disable prettier/prettier */
// product.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from 'src/product/dto/product.dto';
import { ProductRepository } from 'src/product/product.repository';
import { PaginateOutput } from 'src/utils/pagination.utils';
import { PrismaServiceMock } from './test.utils/PrismaServiceMock';
// You can mock Prisma Service
// test/prisma.mock.ts
 

describe('ProductRepository', () => {
    
  let repository: ProductRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    // Mock PrismaService to simulate DB interaction
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        { provide: PrismaService, useClass: PrismaServiceMock }, // Use mocked service here
      ],
    }).compile();

    repository = module.get<ProductRepository>(ProductRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAllPaginated', () => {
    it('should return paginated products', async () => {
      const mockPaginationDto = { page: '1', size: '10' };
      const mockProductData: ProductDto[] = [
        {
          id: 1,
          name: 'Product A',
          category: 'Category 1',
          area: 'Area 1',
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Product B',
          category: 'Category 2',
          area: 'Area 2',
          createdAt: new Date(),
        },
      ];

      const mockTotalCount = 2;

      // Mock Prisma calls inside ProductRepository
      prismaService.product.findMany = jest
        .fn()
        .mockResolvedValue(mockProductData);
      prismaService.product.count = jest.fn().mockResolvedValue(mockTotalCount);

      const result: PaginateOutput<ProductDto> =
        await repository.findAllPaginated(mockPaginationDto);

      expect(result.data).toEqual(mockProductData);
      expect(result.meta.total).toBe(mockTotalCount);
      expect(result.meta.lastPage).toBe(1);
    });
  });

  describe('findById', () => {
    it('should return a product by ID', async () => {
      const mockProduct: ProductDto = {
        id: 1,
        name: 'Product A',
        category: 'Category 1',
        area: 'Area 1',
        createdAt: new Date(),
      };

      // Mock Prisma call inside ProductRepository
      prismaService.product.findUnique = jest
        .fn()
        .mockResolvedValue(mockProduct);

      const result = await repository.findById(1);
      expect(result).toEqual(mockProduct);
    });

    it('should return null if no product is found', async () => {
      // Mock Prisma call inside ProductRepository
      prismaService.product.findUnique = jest.fn().mockResolvedValue(null);

      const result = await repository.findById(999); // Non-existent ID
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const mockProduct: ProductDto = {
        id: 1,
        name: 'Product C',
        category: 'Category 3',
        area: 'Area 3',
        createdAt: new Date(),
      };

      // Mock Prisma call inside ProductRepository
      prismaService.product.create = jest.fn().mockResolvedValue(mockProduct);

      const result = await repository.create(mockProduct);
      expect(result).toEqual(mockProduct);
    });
  });
});
