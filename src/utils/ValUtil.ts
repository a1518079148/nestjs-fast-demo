import { RException } from '../model/RException'
import { Status } from '../model/Status'
import { StrUtil } from './StrUtil'

/**
 * 校验工具
 */
export class ValUtil {
  /**
   * 不为空
   */
  static notNull(str: string, message: string) {
    if (StrUtil.isNull(str)) {
      throw new RException(message + '不能为空', Status.BAD_REQUEST)
    }
  }

  /**
   * 不是数组空数组
   */
  static notArray<T>(list: T[], message: string) {
    if (!list?.length) {
      throw new RException(message + '不能为空', Status.BAD_REQUEST)
    }
  }

  /**
   * 是数字
   */
  static isNumber(num: string, message: string) {
    if (!/^[0-9]+$/.test(num)) {
      throw new RException(message + '应是数字', Status.BAD_REQUEST)
    }
  }

  /**
   * 是电话
   */
  static isPhone(phone: string) {
    if (!/^1\d{10}$/.test(phone)) {
      throw new RException('手机号格式错误', Status.BAD_REQUEST)
    }
  }

  /**
   * 最小长度
   */
  static minLength(str: string, min: number, message: string) {
    if (str.length < min) {
      throw new RException(message + '的长度需大于' + min, Status.BAD_REQUEST)
    }
  }

  /**
   * 最大长度
   */
  static maxLength(str: string, max: number, message: string) {
    if (str.length > max) {
      throw new RException(message + '的长度需小于' + max, Status.BAD_REQUEST)
    }
  }

  /**
   * 最小和最大长度
   */
  static minAndMaxLength(str: string, min: number, max: number, message: string) {
    if (str.length > max || str.length < min) {
      throw new RException(message + '的长度需大于' + min + '并且小于' + max, Status.BAD_REQUEST)
    }
  }

  /**
   * 最小值
   */
  static min(num: number, min: number, message: string) {
    if (num < min) {
      throw new RException(message + '的值需大于' + min, Status.BAD_REQUEST)
    }
  }

  /**
   * 最大值
   */
  static max(num: number, max: number, message: string) {
    if (num > max) {
      throw new RException(message + '的值需小于' + max, Status.BAD_REQUEST)
    }
  }

  /**
   * 最小和最大值
   */
  static minAndMax(num: number, min: number, max: number, message: string) {
    if (num > max || num < min) {
      throw new RException(message + '的值需大于' + min + '并且小于' + max, Status.BAD_REQUEST)
    }
  }
}
