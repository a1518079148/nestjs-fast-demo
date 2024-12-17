import { Prop, Schema } from '@nestjs/mongoose'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, Max, MaxLength, Min } from 'class-validator'
import { Types } from 'mongoose'
import { EnumOperation } from 'src/enum/EnumBase'
/**
 * 基础DTO
 */
@Schema({
  // 添加这个配置来使用字符串类型的 _id
  _id: false,
  versionKey: false
})
export class BaseDto {
  @Prop({
    type: String,
    default: () => new Types.ObjectId().toString()
  })
  @IsOptional({ groups: [EnumOperation.UPDATE] })
  @IsNotEmpty({ groups: [EnumOperation.DELETE] })
  _id: string

  /**
   * 数据状态 -1-20 -1固定为删除
   */
  @Type(() => Number)
  @Prop({
    default: () => 1
  })
  @Min(-1)
  @Max(20)
  @IsOptional()
  status: number

  /**
   * 备注说明
   */
  @Type(() => String)
  @Prop({
    default: () => ''
  })
  @MaxLength(1000)
  @IsOptional()
  desc: string

  /**
   * 排序号
   */
  @Type(() => Number)
  @Prop({
    default: () => 1
  })
  @Min(0)
  @Max(10000)
  @IsOptional()
  sort: number

  /**
   * 父级id
   */
  @Type(() => String)
  @Prop({
    default: () => ''
  })
  @IsOptional()
  parentId: string

  /**
   * 创建时间
   */
  @Prop({
    default: () => Date.now()
  })
  createTime: number

  /**
   * 更新时间
   */
  @Prop({
    default: () => Date.now()
  })
  updateTime: number

  /**
   * 物理删除时间-用于任务删除数据
   */
  @Prop()
  deleteTime: number
}
