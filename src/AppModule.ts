/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module'
import { databaseConfig } from './common/config/database.config'
import { AuthInterceptor } from './common/decorator/auth'
import System from './utils/System'


// console.log('AutoModule',AutoModule);
@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri),
    MongooseModule.forFeature(AutoModule.schemas),
    ServeStaticModule.forRoot({
      rootPath: System.staticPath
    })
  ],
  controllers: AutoModule.controllers,
  providers: [...AutoModule.services, { provide: APP_INTERCEPTOR, useClass: AuthInterceptor }]
})
export class AppModule {}
