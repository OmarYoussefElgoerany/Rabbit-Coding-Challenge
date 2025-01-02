/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';

export class GenericErrorResponse extends HttpException {
  constructor(error: any) {
    super(
      {
        status: 'error',
        message: 'An error occurred',
        error: error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
