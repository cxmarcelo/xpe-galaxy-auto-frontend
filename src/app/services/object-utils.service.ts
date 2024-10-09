import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectUtilsService {

  constructor() { }

  public getValueInsideObject(object: any, field: string): any {
    if (object == null || field == null) {
      return null;
    }

    if (field.includes(".")) {
      let splitedField: string[] = field.split(".");
      let replacedString = field.replace(`${splitedField[0]}.`, "");
      return this.getValueInsideObject(object[splitedField[0]], replacedString);
    }
    return object[field];
  }
}
