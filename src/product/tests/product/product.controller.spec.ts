/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { QueryPaginationDto } from 'src/dtos/QueryPaginationDto';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockService = {
    getAllProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should call service and return paginated products', async () => {
      const query: QueryPaginationDto = { page: '1', size: '5' };
      const paginatedOutput = {
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

      mockService.getAllProducts.mockResolvedValue(paginatedOutput);

      const result = await controller.getAllProducts(query);

      expect(service.getAllProducts).toHaveBeenCalledWith(query);
      expect(result).toEqual(paginatedOutput);
    });
  });
});
