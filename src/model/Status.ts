/**
 * 状态码常量
 */
export class Status {
  /**
   * 成功
   */
  static readonly SUCCESS = 200

  /**
   * 参数列表错误
   */
  static readonly BAD_REQUEST = 400

  /**
   * 未授权
   */
  static readonly UNAUTHORIZED = 401

  /**
   * 权限过期
   */
  static readonly FORBIDDEN = 403

  /**
   * 资源未找到
   */
  static readonly NOT_FOUND = 404

  /**
   * 不允许http方法
   */
  static readonly BAD_METHOD = 405

  /**
   * 系统内部错误
   */
  static readonly ERROR = 500

  /**
   * 非法操作
   */
  static readonly BUG = 600
}
