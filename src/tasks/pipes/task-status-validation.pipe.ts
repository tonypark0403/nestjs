import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any): any {
    // console.log('value:', value);
    // console.log('metadata:', metadata);
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: TaskStatus) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
