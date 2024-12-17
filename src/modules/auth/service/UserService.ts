import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EnumBaseStatus } from 'src/enum/EnumBase'
import { Page } from 'src/model/Page'
import { RException } from 'src/model/RException'
import { UserQuery } from '../model/UserQuery'
import { User } from '../schema/UserSchema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  async list(query: UserQuery): Promise<Page<User>> {
    const criteria: any = {}

    if (query.parentId) criteria.parentId = query.parentId
    if (query.name) criteria.name = { $regex: query.name }
    if (query.status !== undefined) criteria.status = query.status
    if (query.phone) criteria.phone = query.phone
    if (query.account) criteria.account = { $regex: query.account }
    if (query.roleList?.length) criteria.roleList = query.roleList
    if (query.startTime) criteria.createTime = { $gte: query.startTime }
    if (query.endTime) criteria.createTime = { $lte: query.endTime }

    const skip = (query.num - 1) * query.size

    const [total, list] = await Promise.all([
      this.userModel.countDocuments(criteria),
      this.userModel
        .find(criteria)
        .select('-password')
        .sort({ createTime: 1 })
        .skip(skip)
        .limit(query.size)
        .lean()
    ])

    return {
      size: query.size,
      num: query.num,
      list,
      total
    }
  }

  async create(user: User): Promise<void> {
    const criteria = [{ account: user.account }] as any[]
    if (user.phone) criteria.push({ phone: user.phone })
    const existUser = await this.userModel
      .findOne({
        $or: criteria
      })
      .lean()

    if (existUser) throw new RException('账号或手机号已存在')

    await this.userModel.create(user)
  }

  async update(user: User): Promise<void> {
    if (!user._id) throw new RException('用户id不能为空')
    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          nickname: user.nickname,
          status: user.status,
          desc: user.desc,
          roleList: user.roleList,
          updateTime: user.updateTime
        }
      }
    )
  }

  async delete(_id: string): Promise<void> {
    await this.userModel.updateOne({ _id: _id }, { $set: { status: EnumBaseStatus.DISABLE } })
  }
}
