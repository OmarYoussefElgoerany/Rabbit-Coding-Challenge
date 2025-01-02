/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';
import { ProductRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';
import { PaginateOutput } from 'src/utils/pagination.utils';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  const mockRepository = {
    findAllPaginated: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useValue: mockRepository },
      ],
    }).compile();
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ProductService],
  //   }).compile();
  service = module.get<ProductService>(ProductService);
  repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAllProducts', () => {
    it('should return paginated products', async () => {
      const query: QueryPaginationDto = { page: '1', size: '5' };
      const paginatedOutput: PaginateOutput<any> = {
        data: [{ id: 1, name: 'Product 1' }],
        meta: {
          total: 1,
          lastPage: 1,
          currentPage: 1,
          totalPerPage: 5,
          prevPage: null,
          nextPage: null,
        },
      };

      mockRepository.findAllPaginated.mockResolvedValue(paginatedOutput);

      const result = await service.getAllProducts(query);

      expect(repository.findAllPaginated).toHaveBeenCalledWith(query);
      expect(result).toEqual(paginatedOutput);
    });
  });
});