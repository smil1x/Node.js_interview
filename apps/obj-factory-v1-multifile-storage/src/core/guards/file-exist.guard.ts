import { BadRequestException, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectRepository } from '../../object/object.repository';
import * as uuid from 'uuid';
import { generateS3Key } from '../utils';
import { fileNotFoundMsg } from '@app/common';
import { matchExtensionRegExp, NO_EXTENSION_ERROR_MESSAGE } from '../constants';

export class FileExistGuard implements CanActivate {
  constructor(
    @InjectRepository(ObjectRepository)
    private objectRepository: ObjectRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, fileName } = request.params;
    const currentUser = request.user;

    const isUUID = uuid.validate(id);
    const fileNameWithExtension = fileName.match(matchExtensionRegExp);

    if (!isUUID) {
      throw new BadRequestException('Validation failed (uuid v4 is expected)');
    }
    if (!fileNameWithExtension) {
      throw new BadRequestException(NO_EXTENSION_ERROR_MESSAGE);
    }

    return this.validateFile(id, fileName, currentUser);
  }

  private async validateFile(id: string, fileName: string, currentUser) {
    const { sub: userId, username, email } = currentUser;
    const fileS3Key = generateS3Key(id, userId, fileName);

    const findFileRowQueryParams = [id, fileS3Key];
    const foundFile = await this.objectRepository.getFileMetadataRow(findFileRowQueryParams);
    if (foundFile.length === 0) {
      throw new NotFoundException(
        fileNotFoundMsg('name', fileName, `Dear, ${username || email}, try to upload your ${fileName} file.`),
      );
    }

    return true;
  }
}
