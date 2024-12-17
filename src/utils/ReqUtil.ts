import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { networkInterfaces } from 'os'

@Injectable()
export class ReqUtil {
  /**
   * 获取客户端IP地址
   * @param request Express请求对象
   * @returns IP地址
   */
  static getIpAddr(request: Request): string {
    let ipAddress: string = null

    try {
      ipAddress = request.header('x-forwarded-for')
      if (!ipAddress || ipAddress === 'unknown') {
        ipAddress = request.header('Proxy-Client-IP')
      }
      if (!ipAddress || ipAddress === 'unknown') {
        ipAddress = request.header('WL-Proxy-Client-IP')
      }
      if (!ipAddress || ipAddress === 'unknown') {
        ipAddress = request.ip
        if (ipAddress === '127.0.0.1' || ipAddress === '::1') {
          // 获取本机IP
          const nets = networkInterfaces()
          for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
              // 跳过内部IP和非IPv4
              if (net.family === 'IPv4' && !net.internal) {
                ipAddress = net.address
                break
              }
            }
            if (ipAddress) break
          }
        }
      }

      // 处理多个IP的情况,取第一个非unknown的IP
      if (ipAddress && ipAddress.length > 15) {
        if (ipAddress.indexOf(',') > 0) {
          ipAddress = ipAddress.split(',')[0]
        }
      }
    } catch (e) {
      ipAddress = ''
    }

    return ipAddress
  }

  /**
   * 获取本机IPV4地址 192开头
   * @returns IP地址
   */
  static getLocalIp(): string {
    const nets = networkInterfaces()
    return (
      Object.values(nets)
        .flat()
        .find((net) => net.family === 'IPv4' && !net.internal && net.address.startsWith('192'))?.address || ''
    )
  }

  /**
   * 获取用户代理类型
   * @param ua 用户代理字符串
   * @returns 设备类型: android/ios/pc
   */
  static getUserAgent(ua: string): string {
    ua = ua.toLowerCase()
    const isAndroid = ua.includes('linux') || ua.includes('android') || ua.includes('adr') || ua.includes('okhttp')
    if (isAndroid) {
      return 'android'
    }
    const isIOS =
      ua.includes('darwin') ||
      ua.includes('iphone') ||
      ua.includes('ipad') ||
      ua.includes('ipod') ||
      ua.includes('macintosh') ||
      ua.includes('cfnetwork')
    if (isIOS) {
      return 'ios'
    }
    return 'pc'
  }

  /**
   * 通过文件名获取文件类型
   * @param filename 文件名
   * @returns [文件名, 文件类型, 后缀名]
   */
  static getType(filename: string): string[] {
    const result: string[] = [null, null, null]

    try {
      const sufIndex = filename.lastIndexOf('.')
      const suf = filename.substring(sufIndex + 1).toLowerCase()
      const name = filename.substring(0, sufIndex)

      result[0] = name
      result[2] = suf

      // 图片类型
      if (['png', 'jpg', 'gif', 'jpeg'].includes(suf)) {
        result[1] = 'png'
      }
      // 音频类型
      else if (['mp3', 'm4a', 'wav', 'ogg', 'flac'].includes(suf)) {
        result[1] = 'mp3'
      }
      // 视频类型
      else if (['avi', 'mp4', 'm4v', 'flv', 'rmvb', 'wmv'].includes(suf)) {
        result[1] = 'mp4'
      }
    } catch (e) {
      // 出错时返回默认值
    }
    return result
  }
}
