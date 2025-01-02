/* eslint-disable prettier/prettier */
// product.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TopProductsDto } from 'src/product/dto/top-products.dto';
import { ProductRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';
import { BadRequestException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            findAllPaginated: jest.fn(),
            getTopProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return paginated products', async () => {
      const mockPaginatedProducts = {
        data: [
          {
            id: 1,
            name: 'Product A',
            category: 'Electronics',
            area: 'Area 1',
            createdAt: '2024-01-01T00:00:00Z',
          },
          {
            id: 2,
            name: 'Product B',
            category: 'Books',
            area: 'Area 2',
            createdAt: '2024-01-02T00:00:00Z',
          },
        ],
        meta: {
          total: 2,
          currentPage: 1,
          lastPage: 1,
          totalPerPage: 10,
          prevPage: null,
          nextPage: null,
        },
      };

      const paginationQuery = { page: '1', size: '10' };
      repository.findAllPaginated = jest.fn().mockResolvedValue(mockPaginatedProducts);

      const result = await service.getAllProducts(paginationQuery);
      expect(result).toEqual(mockPaginatedProducts);
      expect(repository.findAllPaginated).toHaveBeenCalledWith(paginationQuery);
    });

  });

  describe('getTopProductsByArea', () => {
    it('should return top products for a valid area', async () => {
      const mockTopProducts: TopProductsDto[] = [
        { id: 1, name: 'Product A', category: 'Product 20270 Category 1' },
        { id: 2, name: 'Product B', category: 'Product 68698 Category' },
      ];

      const area = 'Area 1';
      repository.getTopProducts = jest.fn().mockResolvedValue(mockTopProducts);

      const result = await service.getTopProductsByArea(area);
      expect(result).toEqual(mockTopProducts);
      expect(repository.getTopProducts).toHaveBeenCalledWith(area);
    });

    it('should throw an error if the area is invalid', async () => {
      const invalidAreas = ['', 'A', 'VeryLongAreaName'];

      for (const area of invalidAreas) {
        // Expecting BadRequestException to be thrown
        await expect(service.getTopProductsByArea(area)).rejects.toThrow(
          new BadRequestException('Invalid area value. The area must be a non-empty string between 2 and 10 characters.')
        );
      }
    });

  });

  it('should throw an error if area is not provided', async () => {
    const area = ''; // Empty area

    await expect(service.getTopProductsByArea(area)).rejects.toThrow(
      new BadRequestException('Invalid area value. The area must be a non-empty string between 2 and 10 characters.')
    );
  });

  it('should throw an error if area is too short', async () => {
    const area = 'A'; // Too short area

    await expect(service.getTopProductsByArea(area)).rejects.toThrow(
      new BadRequestException('Invalid area value. The area must be a non-empty string between 2 and 10 characters.')
    );
  });

  it('should throw an error if area is too long', async () => {
    const area = 'A'.repeat(51); // Too long area

    await expect(service.getTopProductsByArea(area)).rejects.toThrow(
      new BadRequestException('Invalid area value. The area must be a non-empty string between 2 and 10 characters.')
    );
  });
});
