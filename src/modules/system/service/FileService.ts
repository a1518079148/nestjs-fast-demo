import { Injectable } from '@nestjs/common'
import System from 'src/utils/System'
import { FileUtil } from 'tools-nest'

@Injectable()
export class FileService {
  /**
   * 上传多个文件
   * @param files 文件
   * @returns 文件路径
   */
  async upload(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadFile(file)))
  }

  /**
   * 上传单个文件
   * @param file 文件
   * @returns 文件路径
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const { savePath, url } = System.getUploadPath(file)
    await FileUtil.writeFile(savePath, file.buffer)
    return url
  }
}
