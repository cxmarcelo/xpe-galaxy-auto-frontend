import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Car } from '../../../../../models/dto/car';
import { CarStatusEnum } from '../../../../../models/enums/car-status-enum';
import { CarCreateUpdate } from '../../../../../models/dto/car-create-update';
import { CarService } from '../../../../../services/car.service';
import { MessageService } from 'primeng/api';
import { FormatErrorUtilsService } from '../../../../../services/format-error-utils.service';

@Component({
  selector: 'app-car-edit-dialog',
  templateUrl: './car-edit-dialog.component.html',
  styleUrl: './car-edit-dialog.component.scss'
})
export class CarEditDialogComponent implements OnInit {

  @Input() dialogOpened: boolean = false;
  @Output() dialogOpenedChange = new EventEmitter<boolean>();

  @Input() car: Car | null = null;
  @Output() carChange = new EventEmitter<Car | null>();

  editCar!: CarCreateUpdate;

  image?: File;

  carStatusEnumList: any[] = [];

  @Output() saveEvent = new EventEmitter<void>();

  constructor(
    private carService: CarService,
    private formatErrorUtilsService: FormatErrorUtilsService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {

    this.carStatusEnumList = [
      { name: 'Habilitado', code: CarStatusEnum.AVAILABLE },
      { name: 'Desabilitado', code: CarStatusEnum.UNAVAILABLE }
    ];

    this.createNewCarObject();

  }

  public onShow() {
    this.createNewCarObject();
  }

  public saveOrUpdate() {
    if (this.car?.id != null) {
      this.updateCar();
    } else {
      this.createCar();
    }
  }

  private createCar() {
    if (!this.isValidateCar()) {
      return;
    }

    this.carService.createCar(this.editCar, this.image!).subscribe({
      next: resp => {
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: "Carro criado com sucesso." });
        this.dialogOpened = false;
        this.saveEvent.emit();
      },
      error: httpError => {
        let error = httpError.error;
        this.formatErrorUtilsService.printErrors(error);
      }
    })
  }

  isValidateCar(): boolean {
    if (this.car?.id == null && this.image == null) {
      return true;
    }


    return true;
  }

  private updateCar() {
    if (!this.isValidateCar()) {
      return;
    }

    this.carService.updateCar(this.car!.id, this.editCar).subscribe({
      next: resp => {
        console.log("Carro atualizado");
        console.log(resp);
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: "Carro atualizado com sucesso." });
        this.dialogOpened = false;
        this.saveEvent.emit();
      },
      error: err => {
        console.log("Carro Erro");
        console.log(err);
      }
    })
  }


  private createNewCarObject() {
    this.editCar = {
      name: "",
      brand: "",
      description: "",
      plate: "",
      price: 0,
      status: CarStatusEnum.AVAILABLE,
    }
  }

  public close() {
    this.dialogOpened = false;
  }

  public onHide() {
    this.car = null;
    this.image = undefined;
    this.dialogOpened = false;
    this.dialogOpenedChange.emit(this.dialogOpened);
    this.carChange.emit(this.car);
  }


  public getTitle() {
    if (this.car?.id) {
      return "Editar Carro";
    }
    return "Adicionar Carro";
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  onUpload(event: any) {
    this.image = event.currentFiles[0];
    console.log(this.image)
  }

}