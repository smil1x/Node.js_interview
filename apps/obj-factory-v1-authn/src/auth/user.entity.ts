import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as crypto from 'crypto';
import { CRYPTO_ALGORITHM, CRYPTO_ENCODING } from './constants';
import { lodashOmit } from '@app/common/utils';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'userId' })
  userId: string;

  @Column({ type: 'character varying', length: 256, name: 'phone', nullable: true, unique: true })
  phone: string | null;

  @Column({ type: 'character varying', length: 256, name: 'email', nullable: true, unique: true })
  email: string | null;

  @Column({ type: 'character varying', length: 256, name: 'username', nullable: true, unique: true })
  username: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ type: 'character varying', length: 256, name: 'pwdHash', nullable: true })
  pwdHash: string | null;

  @Column('jsonb', { name: 'metadata', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'character varying', length: 256, name: 'createdBy', nullable: true, default: 'system' })
  createdBy: string | null;

  @Column({
    type: 'timestamp without time zone',
    name: 'createdAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt: Date;

  @Column({ type: 'character varying', length: 256, name: 'updatedBy', nullable: true, default: 'system' })
  updatedBy: string | null;

  @Column({
    type: 'timestamp without time zone',
    name: 'updatedAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt: Date;

  static getPwdHash(password) {
    return crypto.createHash(CRYPTO_ALGORITHM).update(password).digest(CRYPTO_ENCODING);
  }

  static getDefaultUsername(firstName: string, lastName: string | null, duplicates = 0): string | null {
    let username;
    if (firstName && lastName) {
      username = `${firstName}_${lastName}`;
    } else if (firstName) {
      username = firstName;
    } else if (lastName) {
      username = lastName;
    } else {
      return null;
    }
    return `${username}${duplicates || ''}`;
  }

  static fromDto(dto): UserEntity {
    const user = new UserEntity();

    user.phone = dto.phone;
    user.email = dto.email;
    user.username = dto.username;
    user.pwdHash = dto.password && UserEntity.getPwdHash(dto.password);

    const userMetadata = lodashOmit(dto, ['phone', 'email', 'password', 'username']);
    user.metadata = {
      ...userMetadata,
    };
    return user;
  }
}
