import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const statusCode = exception.getStatus() || 500;
        //@ts-ignore
        response.status(Number(statusCode)).json({
            statusCode: Number(statusCode),
            timestamp: new Date().toISOString(),
            path: request.url,
            success: false,
            error: exception.getResponse()?.['error'] || 'Internal Server Error',
            message:
                exception.message
                || exception.getResponse()['message']
                || 'Internal Server Error',
        });
    }
}
