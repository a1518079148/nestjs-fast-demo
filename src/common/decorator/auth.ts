import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  SetMetadata
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

export const AUTH_KEY = 'auth'
export const auth = () => SetMetadata(AUTH_KEY, true)

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取当前处理方法的元数据，判断是否需要进行请求头验证
    const requiresAuth = this.reflector.get<boolean>(AUTH_KEY, context.getHandler())

    if (requiresAuth) {
      const request = context.switchToHttp().getRequest()

      // 获取请求头中的某个特定字段，例如 Authorization
      const authorizationHeader = request.headers['authorization']

      // 验证请求头的字段是否符合预期
      if (!authorizationHeader || authorizationHeader !== 'Bearer valid-token') {
        // 请求头不正确时抛出 ForbiddenException
        throw new ForbiddenException('Invalid or missing authorization header')
      }
    }

    return next.handle()
  }
}
