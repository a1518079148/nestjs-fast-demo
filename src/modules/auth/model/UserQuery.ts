import { Type } from 'class-transformer'
import { IsOptional, IsPhoneNumber } from 'class-validator'
import { Page } from 'src/model/Page'

export class UserQuery extends Page {
  @Type(() => String)
  @IsOptional()
  name: string

  @Type(() => Boolean)
  @IsOptional()
  status: boolean

  @Type(() => String)
  @IsOptional()
  @IsPhoneNumber('CN')
  phone: string

  @Type(() => String)
  @IsOptional()
  account: string

  @Type(() => String)
  @IsOptional()
  parentId: string

  @Type(() => Array)
  @IsOptional()
  roleList: string[]
}
