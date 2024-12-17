import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { auth } from 'src/common/decorator/auth'
import { EnumOperation } from 'src/enum/EnumBase'
import R from 'src/model/R'
import { UserQuery } from '../model/UserQuery'
import { User } from '../schema/UserSchema'
import { UserService } from '../service/UserService'
import { Page } from 'src/model/Page'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('list')
  async list(@Body(ValidationPipe) userQ: UserQuery): Promise<Page<User>> {
    console.log('pagination', userQ)
    return await this.userService.list(userQ)
  }

  @Post('create')
  async create(@Body(new ValidationPipe({ groups: [EnumOperation.CREATE] })) user: User): Promise<void> {
    await this.userService.create(user)
  }

  @Post('update')
  async update(@Body(new ValidationPipe({ groups: [EnumOperation.UPDATE] })) user: User): Promise<void> {
    await this.userService.update(user as User)
  }

  @Post('delete')
  async delete(@Body(new ValidationPipe()) _id: string): Promise<void> {
    await this.userService.delete(_id)
  }

  @Post('authTest')
  @auth()
  async authTest(): Promise<string> {
    return 'success'
  }
}
