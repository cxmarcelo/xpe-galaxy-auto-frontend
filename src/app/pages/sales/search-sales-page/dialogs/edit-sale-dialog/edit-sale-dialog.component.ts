import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Sale } from '../../../../../models/dto/sale';
import { SaleService } from '../../../../../services/sale.service';
import { MessageService } from 'primeng/api';
import { SaleUpdate } from '../../../../../models/dto/sale-update';

@Component({
  selector: 'app-edit-sale-dialog',
  templateUrl: './edit-sale-dialog.component.html',
  styleUrl: './edit-sale-dialog.component.scss'
})
export class EditSaleDialogComponent {

  @Input() dialogOpened: boolean = false;
  @Output() dialogOpenedChange = new EventEmitter<boolean>();

  @Input() sale: Sale | null = null;
  @Output() saleChange = new EventEmitter<Sale | null>();

  saleUpdate!: SaleUpdate;

  @Output() saveEvent = new EventEmitter<Sale>();

  constructor(
    private saleService: SaleService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sale"]) {
      this.createNewSaleObject();
    }
  }

  public updateSale() {
    if (!this.isValidSale()) {
      return;
    }

    this.saleService.updateSale(this.sale!.id, this.saleUpdate).subscribe({
      next: resp => {
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: "Venda criada com sucesso." });
        this.dialogOpened = false;
        this.saveEvent.emit(resp);
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err?.error.msg });
      }
    })
  }

  private isValidSale(): boolean {
    if (this.sale?.id == null) {
      return false;
    }

    return true;
  }

  private createNewSaleObject() {
    this.saleUpdate = {
      clientName: this.sale?.clientName || "",
      clientCpfOrCnpj: this.sale?.clientCpfOrCnpj || "",
      commission: this.sale?.commission || 0,
    }
  }

  public close() {
    this.dialogOpened = false;
  }

  public onHide() {
    this.sale = null;
    this.dialogOpened = false;
    this.dialogOpenedChange.emit(this.dialogOpened);
    this.saleChange.emit(this.sale);
  }


}
