/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
    
        let status = HttpStatus.INTERNAL_SERVER_ERROR; // Default status code
    
        if (exception instanceof HttpException) {
          status = exception.getStatus(); // Get status code from HttpException
        }
    

    response.status(status).json({
      statusCode: status,
      message: exception.message, // Customize the response message as needed
    });
  }
}
