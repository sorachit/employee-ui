import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '../type/gender';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: Gender): string {
    return value === Gender.MALE ? 'Male' : 'Female';
  }

}
