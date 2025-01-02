/* eslint-disable prettier/prettier */
export class PrismaServiceMock {
  product = {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
  };
}
