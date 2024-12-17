import { Prop, Schema } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator'
import { EnumOperation } from 'src/enum/EnumBase'
import { BaseDto } from 'src/model/BaseDto'

@Schema({
  collection: 'auth_user',
})
export class User extends BaseDto {
  /**
   * 昵称
   */
  @Type(() => String)
  @Prop()
  @IsNotEmpty({ groups: [EnumOperation.CREATE] })
  @IsOptional({ groups: [EnumOperation.UPDATE] })
  nickname: string

  /**
   * 手机号
   */
  @Type(() => String)
  @IsPhoneNumber('CN', { groups: [EnumOperation.CREATE] })
  @Prop()
  @IsOptional({ groups: [EnumOperation.UPDATE] })
  phone: string

  /**
   * 账号
   */
  @Type(() => String)
  @Prop()
  @IsNotEmpty({ groups: [EnumOperation.CREATE] })
  @IsOptional({ groups: [EnumOperation.UPDATE] })
  account: string

  /**
   * 密码
   */
  @Type(() => String)
  @Prop()
  @IsNotEmpty({ groups: [EnumOperation.CREATE] })
  @IsOptional({ groups: [EnumOperation.UPDATE] })
  password: string

  /**
   * 生日
   */
  @Type(() => Number)
  @Prop()
  birthday: number

  /**
   * 生日类型 true-阴历 false-阳历
   */
  @Type(() => Boolean)
  @Prop()
  birthdayType: boolean

  /**
   * 角色列表
   */
  @Type(() => Array)
  @Prop()
  @IsOptional({ groups: [EnumOperation.UPDATE] })
  roleList: string[]
}
