import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExceptionErrorCodeEnum } from '../models/enums/exception-error-code-enum';
import { StandardError } from '../models/dto/errors/standard-error';
import { FormsError } from '../models/dto/errors/forms-error';

@Injectable({
  providedIn: 'root'
})
export class FormatErrorUtilsService {

  constructor(private messageService: MessageService,) { }

  public printErrors(error: any, defaultMsg?: string) {
    if (error?.code == ExceptionErrorCodeEnum.STANDARD_ERROR) {
      this.printStandardError(error);
    } else if (error.code == ExceptionErrorCodeEnum.FORM_FIELD_ERROR_LIST) {
      this.printFormError(error);
    } else {
      this.messageService.add({ severity: 'error', summary: `Erro: `, detail: defaultMsg ?? "Falha na requisição" });
    }
  }

  private printStandardError(error: StandardError) {
    this.messageService.add({ severity: 'error', summary: `Erro: `, detail: error.msg });
  }

  private printFormError(error: FormsError) {
    error.errors.forEach(err => {
      this.messageService.add({ severity: 'error', summary: `${err.field}: `, detail: err.error });
    })
  }

}
