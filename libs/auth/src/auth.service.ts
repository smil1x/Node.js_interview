import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignupDto, UpdateUserDto, GetUserDto } from './dto';
import { UserEntity } from './user.entity';
import { Brackets, EntityManager, Like, Repository } from 'typeorm';
import { lodashMerge, lodashOmit } from '@app/common/utils';
import { plainToClass } from 'class-transformer';
import { TransactionWrapper } from '@app/common/decorators';
import { setSessionUserQuery } from '@app/common/db/queries';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<string> {
    const pwdHash = UserEntity.getPwdHash(dto.password);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .where('user.pwdHash = :pwdHash', { pwdHash })
      .andWhere(
        new Brackets((qb) => {
          qb.where('phone = :phone', { phone: dto.identity })
            .orWhere('email = :email', { email: dto.identity })
            .orWhere('username = :username', { username: dto.identity });
        }),
      )
      .getOne();
    if (!user) {
      return null;
    }

    const { userId, ...payload } = lodashOmit(user, ['pwdHash']);
    return this.jwtService.sign({ sub: userId, ...payload });
  }

  @TransactionWrapper
  async signup(dto: SignupDto, userId: string | undefined, entityManager: EntityManager = null): Promise<UserEntity> {
    let duplicates;
    if ((dto.firstName || dto.lastName) && !dto.username) {
      duplicates = await entityManager.count(UserEntity, {
        where: { username: Like(`${UserEntity.getDefaultUsername(dto.firstName, dto.lastName)}%`) },
      });
    }
    const newUserEntity = await UserEntity.fromDto({
      ...dto,
      username: dto.username || UserEntity.getDefaultUsername(dto.firstName, dto.lastName, duplicates),
    });

    await entityManager.query(setSessionUserQuery(userId));
    return entityManager
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        ...newUserEntity,
        createdBy: () => "current_setting('current.userId')",
        updatedBy: () => "current_setting('current.userId')",
      })
      .returning('*')
      .execute()
      .then((insertResult) => plainToClass(UserEntity, insertResult.raw[0]));
  }

  async getUser(params: GetUserDto) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('phone = :phone', { phone: params.identity })
      .orWhere('email = :email', { email: params.identity })
      .orWhere('username = :username', { username: params.identity })
      .getOne();
  }

  @TransactionWrapper
  async updateUser(
    dto: UpdateUserDto,
    targetUserId: string,
    userId: string,
    entityManager: EntityManager = null,
  ): Promise<UserEntity> {
    const updatedFields = UserEntity.fromDto(dto);
    const user = await entityManager.findOne(UserEntity, targetUserId);
    const updatedUserEntity = lodashMerge({}, user, updatedFields);

    await entityManager.query(setSessionUserQuery(userId));
    await entityManager.update(UserEntity, targetUserId, {
      ...updatedUserEntity,
      updatedBy: () => "current_setting('current.userId')",
      updatedAt: () => 'current_timestamp(0)',
    });
    return entityManager.findOne(UserEntity, targetUserId);
  }
}
