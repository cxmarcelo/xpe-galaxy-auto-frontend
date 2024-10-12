import { Injectable } from '@angular/core';
import { UploadService } from '../upload-service';
import { Observable } from 'rxjs';
import { UploadServiceEnum } from '../../../../../models/enums/upload-service-enum';
import { SaleCommissionService } from '../../../../../services/sale-commission.service';

@Injectable({
  providedIn: 'root'
})
export class SaleCommissionUploadService implements UploadService {

  constructor(
    private saleCommissionService: SaleCommissionService
  ) { }

  getTitle(): string {
    return 'Atualizar Comissões com arquivo.';
  }

  getUploadServiceEnum(): UploadServiceEnum {
    return UploadServiceEnum.SALE_COMMISSION_UPDATE;
  }

  acceptFiles(): string {
    return "";
  }

  uploadFile(file: File): Observable<any> {
    return this.saleCommissionService.uploadSaleCommision(file);
  }

}
