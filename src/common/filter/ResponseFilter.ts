import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import R from 'src/model/R'

@Injectable()
export class ResponseFilter implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        context.switchToHttp().getResponse().status(200)
        if (data instanceof R) return data
        return R.success(data)
      })
    )
  }
}
