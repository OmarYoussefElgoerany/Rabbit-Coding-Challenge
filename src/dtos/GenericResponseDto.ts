/* eslint-disable prettier/prettier */
export class GenericResponseDto<T> {
  status: string;
  message: string;
  data: T;
  error?: any; 
}
