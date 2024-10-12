import { Component } from '@angular/core';
import { Column } from '../../../models/internal/column';
import { SaleCommissionService } from '../../../services/sale-commission.service';
import { ObjectUtilsService } from '../../../services/object-utils.service';
import { MessageService } from 'primeng/api';
import { Sale } from '../../../models/dto/sale';
import { PageEvent } from '../../../models/internal/page-event';
import { FormatUtilsService } from '../../../services/format-utils.service';

@Component({
  selector: 'app-search-commissions-page',
  templateUrl: './search-commissions-page.component.html',
  styleUrl: './search-commissions-page.component.scss'
})
export class SearchCommissionsPageComponent {

  page: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 12;
  cols!: Column[];
  salesCommissions: Sale[] = [];

  blockDownloadButton: boolean = false;

  constructor(
    private saleCommissionService: SaleCommissionService,
    private objectUtilsService: ObjectUtilsService,
    private formatUtilsService: FormatUtilsService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.cols = [
      { header: 'Vendedor', field: 'sellerName', },
      { header: 'Carro', field: 'car.name', },
      { header: 'Placa', field: 'car.plate', },
      { header: 'Comissão', field: 'commission', },
      { header: 'Data Venda', field: 'createDate', },
      { header: 'Data Atualização', field: 'lastUpdate', },
    ];

    this.searchSales();
  }

  public searchSales() {
    this.saleCommissionService.getAllSaleCommissions(this.page, this.rows).subscribe({
      next: resp => {
        console.log("sales");
        console.log(resp);
        this.salesCommissions = resp.content;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  public formatField(sale: Sale, column: Column) {
    if (["createDate", "lastUpdate"].includes(column.field)) {
      return this.formatUtilsService.formatDate(this.objectUtilsService.getValueInsideObject(sale, column.field));
    }
    return this.objectUtilsService.getValueInsideObject(sale, column.field);
  }

  onPageChange(event?: PageEvent) {
    if (event) {
      this.page = event.page!;
      this.first = event.first!;
      this.rows = event.rows!;

      this.searchSales();
    }
  }


  public exportExcel() {
    this.saleCommissionService.exportAllSaleCommissions(this.page, this.rows).subscribe({
      next: resp => {
        const blob = new Blob([resp], { type: resp.type })
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = "sale_commission.xlsx";
        link.click()
        window.URL.revokeObjectURL(url)
        link.remove();
        this.messageService.add({ severity: 'success', summary: 'Successo:', detail: 'Arquivo gerado com sucesso' });
        this.blockDownloadButton = false;
      },
      error: err => {
        this.blockDownloadButton = false;
        //this.errorUtilsService.printErrors(this.msgToastKey, errorResponse?.error, "Erro para fazer o download do arquivo'")
      }
    })
  }





}
