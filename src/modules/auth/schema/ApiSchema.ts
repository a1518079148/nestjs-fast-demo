import { Prop, Schema } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { EnumOperation } from 'src/enum/EnumBase'
import { BaseDto } from 'src/model/BaseDto'

@Schema({
  collection: 'auth_api'
})
export class Api extends BaseDto {
  /**
   * 标题
   */
  @Type(() => String)
  @Prop()
  @IsNotEmpty()
  @IsOptional({ groups: [EnumOperation.UPDATE] })
  title: string

  /**
   * 类型 1: 菜单 2: 接口地址
   */
  @Type(() => Number)
  @Prop()
  @IsNotEmpty()
  @IsOptional({ groups: [EnumOperation.UPDATE] })
  type: number

  /**
   * 路径
   */
  @Type(() => String)
  @Prop()
  @IsNotEmpty()
  @IsOptional()
  url: string
}
