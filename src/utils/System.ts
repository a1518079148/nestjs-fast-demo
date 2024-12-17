import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { join } from 'path'

let rootPath = join(__dirname, '../../')
let staticPath = join(rootPath, 'public')
if (!existsSync(staticPath)) {
  staticPath = join(rootPath, '../public')
  // mkdirSync(staticPath)
  // FileUtil.copyFolder(join(rootPath, '../public'), staticPath)
}

/**
 * 系统工具类
 */
export default class System {
  /**
   * 根路径
   */
  static rootPath = rootPath

  /**
   * 静态资源路径
   */
  static staticPath = staticPath

  /**
   * 本地文件上传路径
   */
  static uploadPath = join(staticPath, 'upload')

  /**
   * 获取上传文件路径
   * @param file 文件
   * @returns 文件路径
   */
  static getUploadPath(file: Express.Multer.File): { savePath: string; url: string } {
    const ext = file.originalname.split('.').pop()
    const fileName = randomUUID() + '.' + ext
    return {
      savePath: join(System.uploadPath, fileName),
      url: '/' + join('upload', fileName).replace(/\\/g, '/')
    }
  }
}
