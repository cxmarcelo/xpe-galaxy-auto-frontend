import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadService } from './services/upload-service';
import { UploadServiceEnum } from '../../../models/enums/upload-service-enum';
import { SaleCommissionUploadService } from './services/impl/sale-commission-upload.service';
import { FormatErrorUtilsService } from '../../../services/format-error-utils.service';
import { ExceptionErrorCodeEnum } from '../../../models/enums/exception-error-code-enum';
import { ErrorMessageList } from '../../../models/dto/errors/error-message-list';
import { ErrorMessage } from '../../../models/dto/errors/error-message';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrl: './upload-dialog.component.scss'
})
export class UploadDialogComponent {

  @Input() dialogOpened: boolean = false;
  @Output() dialogOpenedChange = new EventEmitter<boolean>();

  @Input() uploadService!: UploadServiceEnum;

  @Output() uploadEvent = new EventEmitter<void>();

  file?: File;

  servicesMap: Map<UploadServiceEnum, UploadService>;

  errorList: ErrorMessage[] = [];

  constructor(
    private messageService: MessageService,
    private formatErrorUtilsService: FormatErrorUtilsService,
  ) {

    this.servicesMap = new Map();
    this.servicesMap.set(UploadServiceEnum.SALE_COMMISSION_UPDATE, inject(SaleCommissionUploadService));
  }

  ngOnInit(): void {
    if (this.uploadService == null) {
      throw "Nenhum serviço (UploadServiceEnum) de upload foi selecionado.";
    }

  }

  public uploadFile() {
    if (this.file == null) {
      return;
    }

    this.getService()?.uploadFile(this.file).subscribe({
      next: resp => {
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: "Upload concluído." });
        this.dialogOpened = false;
        this.uploadEvent.emit();
      },
      error: httpError => {
        let error = httpError.error;
        this.formatErrorUtilsService.printErrors(error, "Falha na importação consulte os erros na tabela.");
        if (error?.code == ExceptionErrorCodeEnum.ERROR_LIST) {
          console.log("Estou entrando aqui")
          this.errorList = error.errorList || [];
        } else {
          console.log("ELse?")
        }
      }
    });
  }

  private getService(): UploadService | null {
    return this.servicesMap.get(this.uploadService) || null;
  }

  public close() {
    this.dialogOpened = false;
  }

  public onHide() {
    this.dialogOpened = false;
    this.dialogOpenedChange.emit(this.dialogOpened);
  }

  public getTitle() {
    return this.getService()?.getTitle() || "Upload";
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload(event: any) {
    this.file = event.currentFiles[0];
  }
}
