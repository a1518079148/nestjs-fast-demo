export default class R {
  data: any = null
  message: any
  code: number = 200

  static success(...params: any) {
    const data = params[0] || 'success'
    const message = params[1] || ''
    const res = new R()
    res.data = data
    res.message = message
    return res
  }

  static fail(...params: any) {
    const message = params[0] ?? ''
    const code = params[1] ?? 500
    const res = new R()
    res.message = message
    res.code = code
    return res
  }
}
