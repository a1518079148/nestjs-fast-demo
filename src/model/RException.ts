/**
 *异常提示
 */
export class RException extends Error {
  private msg: string
  private status: number = 500

  constructor(msg: string, status?: number) {
    super(msg)
    this.msg = msg
    if (status) {
      this.status = status
    }
  }
}
