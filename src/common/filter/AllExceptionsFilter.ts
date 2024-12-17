import { ArgumentsHost, BadRequestException, Catch, ForbiddenException, NotFoundException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import R from 'src/model/R'
import { RException } from 'src/model/RException'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('AllExceptionsFilter', exception)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    // const status = exception.getStatus()
    // const url = request.url

    const send = (message: string, statusCode: number) => {
      response.status(200).json(R.fail(message, statusCode))
    }

    if (exception instanceof NotFoundException) {
      send('不存在', 404)
    } else if (exception instanceof ForbiddenException) {
      send('权限不足', 403)
    } else if (exception instanceof BadRequestException) {
      //@ts-ignore
      const reqArr = [...new Set(exception.response.message.map((item: any) => item.split(' ')[0]))]
      send(`校验失败: ${reqArr.join(', ')}`, 400)
    } else if (exception instanceof RException) {
      //@ts-ignore
      send(exception.msg, exception.status)
    } else {
      send('服务器异常', 500)
    }

    super.catch(exception, host)
  }
}
