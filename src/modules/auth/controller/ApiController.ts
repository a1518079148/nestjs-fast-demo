import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { EnumOperation } from 'src/enum/EnumBase'
import { Api } from '../schema/Apischema'
import { ApiService } from '../service/ApiService'

@Controller('auth/api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('list')
  async list(): Promise<Api[]> {
    return await this.apiService.list()
  }

  @Post('create')
  async create(@Body(new ValidationPipe({ groups: [EnumOperation.CREATE] })) api: Api): Promise<void> {
    await this.apiService.create(api)
  }

  @Post('update')
  async update(@Body(new ValidationPipe({ groups: [EnumOperation.UPDATE] })) api: Api): Promise<void> {
    await this.apiService.update(api)
  }

  @Post('delete')
  async delete(@Body(new ValidationPipe({ groups: [EnumOperation.DELETE] })) api: Api): Promise<void> {
    await this.apiService.delete(api._id)
  }
}
