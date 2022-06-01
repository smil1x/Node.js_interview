import { CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

export class UserExistGuard implements CanActivate {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;
    return this.validateUser(userId);
  }

  private async validateUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return true;
  }
}
