import { Type } from 'class-transformer'
import { IsOptional, Min } from 'class-validator'

export class Page<T = any> {
  // --- 分页字段

  @Type(() => Number)
  @Min(1)
  size: number

  @Type(() => Number)
  @Min(1)
  num: number

  list: T[]

  total: number

  // --- 统一查询字段

  @IsOptional()
  startTime?: number

  @IsOptional()
  endTime?: number

}
