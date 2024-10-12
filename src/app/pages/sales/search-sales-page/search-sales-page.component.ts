import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../services/sale.service';
import { PageEvent } from '../../../models/internal/page-event';
import { Sale } from '../../../models/dto/sale';
import { ObjectUtilsService } from '../../../services/object-utils.service';
import { SaleStatusEnum } from '../../../models/enums/sale-status-enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Column } from '../../../models/internal/column';
import { UploadServiceEnum } from '../../../models/enums/upload-service-enum';

@Component({
  selector: 'app-search-sales-page',
  templateUrl: './search-sales-page.component.html',
  styleUrl: './search-sales-page.component.scss'
})
export class SearchSalesPageComponent implements OnInit {

  page: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 12;
  cols!: Column[];
  sales: Sale[] = [];


  //DIALOGS
  editSaleDialogOpened: boolean = false;
  editSaleDialogSale: Sale | null = null;

  uploadCommissionDialogOpened = false;
  uploadServiceDialog: UploadServiceEnum = UploadServiceEnum.SALE_COMMISSION_UPDATE;
  //end dialogs

  constructor(
    private saleService: SaleService,
    private objectUtilsService: ObjectUtilsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.cols = [
      { header: 'Status', field: 'status', },
      { header: 'Carro', field: 'car.name', },
      { header: 'Marca', field: 'car.brand', },
      { header: 'Placa', field: 'car.plate', },
      { header: 'Valor', field: 'car.price', },
      { header: 'Vendedor', field: 'sellerName', },
      { header: 'Cliente', field: 'clientName', },
      { header: 'Comissão', field: 'commission', },
    ];

    this.searchSales();
  }

  public searchSales() {
    this.saleService.getAllSales(this.page, this.rows).subscribe({
      next: resp => {
        console.log("sales");
        console.log(resp);
        this.sales = resp.content;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  public formatField(sale: Sale, column: Column) {
    return this.objectUtilsService.getValueInsideObject(sale, column.field)
  }

  onPageChange(event?: PageEvent) {
    console.log("ON PAGE");
    console.log(event)
    if (event) {
      this.page = event.page!;
      this.first = event.first!;
      this.rows = event.rows!;

      this.searchSales();
    }
  }

  public editSale(sale: Sale) {
    this.editSaleDialogSale = sale;
    this.editSaleDialogOpened = true;
  }

  public openApproveSaleConfirmation(sale: Sale) {
    this.confirmationService.confirm({
      message: `Deseja aprovar a venda ${sale.car.name} - ${sale.car.brand} - ${sale.car.plate} - ${'R$' + sale.car.price}`,
      header: 'Confirmação Aprovar Venda',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptButtonStyleClass: "app-primary-button",
      rejectButtonStyleClass: "app-primary-outline-button",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.approveSale(sale);
      },
    });
  }

  public openRejectSaleConfirmation(sale: Sale) {
    this.confirmationService.confirm({
      message: `Deseja rejeitar a venda ${sale.car.name} - ${sale.car.brand} - ${sale.car.plate} - ${'R$' + sale.car.price}`,
      header: 'Confirmação Rejeitar Venda',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptButtonStyleClass: "app-primary-button",
      rejectButtonStyleClass: "app-primary-outline-button",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.rejectSale(sale);
      },
    });
  }


  private approveSale(sale: Sale) {
    this.saleService.approveSale(sale.id).subscribe({
      next: resp => {
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: "Venda aprovada com sucesso." });
        this.searchSales();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: "Falha para aprovar vendar." });
      }
    })

  }

  private rejectSale(sale: Sale) {
    this.saleService.rejectSale(sale.id).subscribe({
      next: resp => {
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: "Venda rejeitada com sucesso." });
        this.searchSales();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: "Falha para rejeitar vendar." });
      }
    })
  }

  public formatSaleStatus(sale: Sale): string {
    switch (sale.status) {
      case SaleStatusEnum.APPROVED: {
        return "Aprovado"
      }

      case SaleStatusEnum.PENDENT: {
        return "Pendente"
      }

      case SaleStatusEnum.REJECTED: {
        return "Rejeitado"
      }
    }

    return "-";
  }


  public getSeverity(status: SaleStatusEnum) {
    switch (status) {
      case SaleStatusEnum.APPROVED:
        return 'success';
      case SaleStatusEnum.PENDENT:
        return 'warning';
      case SaleStatusEnum.REJECTED:
        return 'danger';
    }

    return "danger"
  }

  public isSalePendent(sale: Sale): boolean {
    return sale.status == SaleStatusEnum.PENDENT;
  }

  public openUploadDialog() {
    this.uploadCommissionDialogOpened = true;
  }

}