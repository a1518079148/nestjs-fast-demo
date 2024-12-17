import { Logger, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './AppModule'
import { AllExceptionsFilter } from './common/filter/AllExceptionsFilter'
import { ResponseFilter } from './common/filter/ResponseFilter'
import { ReqUtil } from './utils/ReqUtil'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.enableCors()

  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalInterceptors(new ResponseFilter())

  const logger = new Logger('Bootstrap')
  await app.listen(3000)

  logger.log(`Application is running on: ${await app.getUrl()}`)
  logger.log(`Local IP: http://${ReqUtil.getLocalIp()}:3000`)
}
bootstrap()
