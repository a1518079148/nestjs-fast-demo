import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Api } from '../schema/Apischema'

@Injectable()
export class ApiService {
  constructor(@InjectModel(Api.name) private readonly apiModel: Model<Api>) {}
  async list(): Promise<Api[]> {
    return await this.apiModel.find().lean()
  }

  async create(api: Api): Promise<void> {
    await this.apiModel.create(api)
  }

  async update(api: Api): Promise<void> {
    await this.apiModel.updateOne(
      { _id: api._id },
      {
        $set: {
          title: api.title,
          type: api.type,
          url: api.url,
          updateTime: api.updateTime
        }
      }
    )
  }

  async delete(_id: string): Promise<void> {
    await this.apiModel.deleteOne({ _id: _id })
  }
}
