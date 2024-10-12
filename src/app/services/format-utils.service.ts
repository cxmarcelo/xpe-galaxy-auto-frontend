import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatUtilsService {

  constructor(
    private datePipe: DatePipe
  ) { }

  public formatDate(date: Date, mask: string = "dd/MM/yyyy"): string | null {
    if (date == null) {
      return null;
    }

    return this.datePipe.transform(date, mask);
  }
}
