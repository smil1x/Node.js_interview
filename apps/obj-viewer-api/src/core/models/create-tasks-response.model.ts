import { ApiProperty } from '@nestjs/swagger';
import { SuccessTaskModel } from './success-task.model';
import { FailedTaskModel } from './failed-task.model';

export class CreateTaskResponse {
  @ApiProperty({
    description: 'Success requests',
    type: [SuccessTaskModel],
  })
  readonly success: SuccessTaskModel[];

  @ApiProperty({
    description: 'failed requests',
    type: [FailedTaskModel],
  })
  readonly failed: FailedTaskModel[];
}
