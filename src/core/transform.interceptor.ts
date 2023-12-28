import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: any;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => {
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    message: data?.message || "",
                    success:
                        context.switchToHttp().getResponse().statusCode < 400,
                    data: {
                        meta: data?.meta,
                        ...data
                    },
                }
            })
        );
    }
}
