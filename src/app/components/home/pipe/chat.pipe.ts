import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatPipe'
})
export class ChatPipe implements PipeTransform {

  transform(value: any[], filterText): any[] {
    if (filterText == "") {
      return value;
    }

    return value.filter(p=> p.userName.toLowerCase().includes(filterText.toLowerCase()))
  }

}
