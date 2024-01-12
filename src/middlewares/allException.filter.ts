import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { OutgoingMessage } from 'http';
import validator from 'validator';


@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost){}
  catch(exception: HttpException, host: ArgumentsHost): OutgoingMessage{
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();
    const statusCode: number = exception && !Number.isNaN(exception.getStatus()) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =  (exception.getResponse() as { message: string }).message;

    const responseBody = {
      error: message,
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    console.log(statusCode)
    return res.status(statusCode).json(responseBody);
  }
}

// // import { Catch, HttpException, ExceptionFilter, ArgumentsHost, Logger, HttpStatus as status } from '@nestjs/common';
// import { HttpArgumentsHost } from '@nestjs/common/interfaces';


// // import { apiResponse } from '@helpers/helper.apiResponse';

// @Catch()
// export class ErrorException implements ExceptionFilter {
  
//   catch(exception: HttpException, host: ArgumentsHost): OutgoingMessage {
//     const args: HttpArgumentsHost = host.switchToHttp();
//     const res: Response = args.getResponse<Response>();
//     const logger: Logger = new Logger('ErrorException');

//     logger.error(`
//       ==================================
//       ======== Error Exception =========
//       ==================================

//         name: ${exception.name}
//         code: ${exception.getStatus()}
//         message: ${exception.message}
//         response: ${JSON.stringify(exception.getResponse())}
//         Stack: ${exception.stack}

//       ==================================
//       ==================================
//       ==================================
//     `);

//     const statusCode: number = exception && !Number.isNaN(exception.getStatus()) ? exception.getStatus() : status.INTERNAL_SERVER_ERROR;
//     const resMessage: any = exception.getResponse();

//     const customErrMessage = resMessage.hasOwnProperty('message') ? resMessage.message : resMessage;
//     const errMessage: any = exception && !validator.isEmpty(exception.message) ? customErrMessage : 'Internal server error';

//     console.log('lol')
//     return res.status(statusCode).json(apiResponse({ stat_code: statusCode, err_message: errMessage }));
//   }
// }
// export function apiResponse({ stat_code: statusCode, err_message: errMessage }: { stat_code: number; err_message: string }) {
//   return {
//     statusCode: statusCode,
//     errorMessage: errMessage,
//   };
// }