import {
  Injectable,
  Inject,
  BadRequestException,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FILE_SIZE } from '../constants';

@Injectable()
export class FilesSizeLimitInterceptor implements NestInterceptor {
  constructor(@Inject(FILE_SIZE) protected readonly MAX_TOTAL_FILES_SIZE: number) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const filesSize = request.files?.reduce((totalSize, file) => totalSize + file.size, 0);

    if (filesSize > this.MAX_TOTAL_FILES_SIZE) {
      throw new BadRequestException(
        `Max files size to upload - ${
          this.MAX_TOTAL_FILES_SIZE / (1024 * 1024)
        } mb. Try to upload files using S3 Presigned URL`,
      );
    }

    return next.handle();
  }
}
