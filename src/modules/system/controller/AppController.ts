import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import R from 'src/model/R'
import { FileService } from '../service/FileService'

@Controller('app')
export class AppController {
  constructor(private readonly fileService: FileService) {}

  @Get('time')
  time(): R {
    const currentTime = Date.now()
    const date = new Date().toISOString()
    const offset = new Date().getTimezoneOffset()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const offset1 = new Date().getTimezoneOffset() * 60 * 1000
    return R.success({
      currentTime,
      date,
      offset,
      timeZone,
      offset1
    })
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return R.success(await this.fileService.upload([file])[0])
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file'))
  async uploads(@UploadedFiles() files: Express.Multer.File[]) {
    return R.success(await this.fileService.upload(files))
  }
}
