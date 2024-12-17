import { randomUUID } from 'crypto'

/**
 * 字符串工具类
 */
export class StrUtil {
  /**
   * 返回UUID
   */
  static uuid(): string {
    return randomUUID()
  }

  /**
   * 返回范围内的随机数
   * @param min 最小值
   * @param max 最大值
   * @returns 随机数
   */
  static getRandom(min: number, max: number): number {
    if (min > max) {
      min = min ^ max
      max = min ^ max
      min = min ^ max
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * 判断字符串是否不为空、空串、空格等不显示符
   */
  static isNotNull(str: string): boolean {
    return !this.isNull(str)
  }

  /**
   * 判断字符串是否为空、空串、空格等不显示符
   */
  static isNull(str: string): boolean {
    return !str || str.length === 0 || str.trim().length === 0 || str === 'null' || str === 'undefined'
  }

  /**
   * 清除所有换行、空格、回车字符
   */
  static clearBlank(str: string): string {
    if (!str) return ''
    return str.replace(/\s+|\t|\r|\n/g, '')
  }

  /**
   * 对String进行UTF-8编码
   */
  static strToUTF8(str: string): string {
    try {
      return encodeURIComponent(str)
    } catch (e) {
      return str
    }
  }
}
