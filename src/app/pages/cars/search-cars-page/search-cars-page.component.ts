import { Component, OnInit } from '@angular/core';
import { Car } from '../../../models/dto/car';
import { CarStatusEnum } from '../../../models/enums/car-status-enum';
import { CarService } from '../../../services/car.service';
import { MessageService } from 'primeng/api';
import { Sale } from '../../../models/dto/sale';
import { PageEvent } from '../../../models/internal/page-event';

@Component({
  selector: 'app-search-cars-page',
  templateUrl: './search-cars-page.component.html',
  styleUrl: './search-cars-page.component.scss'
})
export class SearchCarsPageComponent implements OnInit {

  page: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 12;

  carList: Car[] = [];

  //DIALOGS
  carEditDialogOpened: boolean = false;
  carEditDialogCar: Car | null = null;


  createSaleDialogOpened: boolean = false;
  createSaleDialogCar: Car | null = null;
  //END DIALOGS


  constructor(
    private carService: CarService,
    private messageService: MessageService
  ) {

  }


  ngOnInit() {
    this.searchCars();

    /*
    this.carList = [
      {
        id: 'uuid',
        name: "Carro 1",
        plate: "aaa-1024",
        brand: "Fiat",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, perferendis.",
        price: 15000,
        status: CarStatusEnum.AVAILABLE,
        imageUrl: '',
        createDate: new Date(),
        lastUpdate: new Date()
      }
    ]
      */
  }

  public searchCars() {
    this.carService.getAllCars(this.page, this.rows).subscribe({
      next: resp => {
        console.log(resp);
        this.carList = resp.content;
        this.totalRecords = resp.totalElements;
      }, error: err => {
        console.log(err);
      }
    })
  }

  public editCar(car: Car) {
    this.carEditDialogCar = { ...car };
    this.carEditDialogOpened = true;
  }

  public createCar() {
    this.carEditDialogCar = null;
    this.carEditDialogOpened = true;
  }

  public createSale(car: Car) {
    this.createSaleDialogOpened = true;
    this.createSaleDialogCar = car;
  }

  onPageChange(event?: PageEvent) {
    console.log("ON PAGE");
    console.log(event)
    if (event) {
      this.page = event.page!;
      this.first = event.first!;
      this.rows = event.rows!;

      this.searchCars();
    }
  }

  show() {
  }

  public getStatusClass(status: CarStatusEnum) {
    if (status == CarStatusEnum.AVAILABLE) {
      return "success";
    } else if (status == CarStatusEnum.SALES_PROCESS) {
      return "info";
    }

    return "danger";
  }

  public formatStatus(status: CarStatusEnum) {
    if (status == CarStatusEnum.AVAILABLE) {
      return "Disponível";
    } else if (status == CarStatusEnum.SALES_PROCESS) {
      return "Processo de Venda";
    } else if (status == CarStatusEnum.SOLD) {
      return "Vendido";
    } else if (status == CarStatusEnum.UNAVAILABLE) {
      return "Indinsponível";
    }

    return "-";
  }

  public redirectDialog(sale: Sale) {
    console.log("Saved")
  }

}
