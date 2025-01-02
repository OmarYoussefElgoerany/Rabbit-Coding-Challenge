/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';

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
            getTopProducts: jest.fn(),
            findAllPaginated: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should throw BadRequestException if area is invalid (too short)', async () => {
    const invalidArea = 'A'; // Area too short
    await expect(service.getTopProductsByArea(invalidArea)).rejects.toThrow(
      new BadRequestException(
        'Invalid area value. The area must be a non-empty string between 2 and 10 characters.',
      ),
    );
  });

  it('should throw BadRequestException if area is invalid (too long)', async () => {
    const invalidArea = 'TooLongArea'; // Area too long
    await expect(service.getTopProductsByArea(invalidArea)).rejects.toThrow(
      new BadRequestException(
        'Invalid area value. The area must be a non-empty string between 2 and 10 characters.',
      ),
    );
  });

  it('should throw BadRequestException if area is empty', async () => {
    const invalidArea = ''; // Empty area
    await expect(service.getTopProductsByArea(invalidArea)).rejects.toThrow(
      new BadRequestException(
        'Invalid area value. The area must be a non-empty string between 2 and 10 characters.',
      ),
    );
  });

  it('should return top products if area is valid', async () => {
    const validArea = 'validArea';
    const topProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    repository.getTopProducts = jest.fn().mockResolvedValue(topProducts);

    const result = await service.getTopProductsByArea(validArea);
    expect(result).toEqual(topProducts);
  });
});
