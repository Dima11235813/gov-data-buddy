import { Pipe, PipeTransform } from '@angular/core';
import { TimeUtils } from '../shared/utils/time.utils';

@Pipe({
  name: 'friendlyTime'
})
export class FriendlyTimePipe implements PipeTransform {
  transform(value: string): string {
    return TimeUtils.friendlyTimeAgoString(value)
  }
}






