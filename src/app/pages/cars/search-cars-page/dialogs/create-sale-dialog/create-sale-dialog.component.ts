import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Car } from '../../../../../models/dto/car';
import { SaleService } from '../../../../../services/sale.service';
import { SaleCreate } from '../../../../../models/dto/sale-create';
import { Sale } from '../../../../../models/dto/sale';

@Component({
  selector: 'app-create-sale-dialog',
  templateUrl: './create-sale-dialog.component.html',
  styleUrl: './create-sale-dialog.component.scss'
})
export class CreateSaleDialogComponent {

  @Input() dialogOpened: boolean = false;
  @Output() dialogOpenedChange = new EventEmitter<boolean>();

  @Input() car: Car | null = null;
  @Output() carChange = new EventEmitter<Car | null>();

  saleCreate!: SaleCreate;

  @Output() saveEvent = new EventEmitter<Sale>();

  constructor(
    private saleService: SaleService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["car"]) {
      this.createNewSaleObject();
    }
  }

  public createSale() {
    if (!this.isValidSale()) {
      return;
    }

    this.saleService.createSale(this.saleCreate).subscribe({
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
    if (this.car?.id == null) {
      return false;
    }

    return true;
  }

  private createNewSaleObject() {
    this.saleCreate = {
      carId: this.car?.id || "",
      clientName: "",
      clientCpfOrCnpj: "",
    }
  }

  public close() {
    this.dialogOpened = false;
  }

  public onHide() {
    this.car = null;
    this.dialogOpened = false;
    this.dialogOpenedChange.emit(this.dialogOpened);
    this.carChange.emit(this.car);
  }

}
