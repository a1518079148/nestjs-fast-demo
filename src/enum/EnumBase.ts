export enum EnumBaseStatus {
  /**
   * 物理删除-修改为此状态时也要设置删除时间deleteTime
   */
  PHYSICAL_DELETE = -1,

  /**
   * 逻辑删除
   */
  DELETE = 0,

  /**
   * 正常
   */
  NORMAL = 1,

  /**
   * 禁用-锁定
   */
  DISABLE = 2
}

export enum EnumOperation {
  LIST = 'LIST',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}
