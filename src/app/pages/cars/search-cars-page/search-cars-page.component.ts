import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-cars-page',
  templateUrl: './search-cars-page.component.html',
  styleUrl: './search-cars-page.component.scss'
})
export class SearchCarsPageComponent implements OnInit {

  carList: any[] = [];

  constructor() { }

  ngOnInit() {

    this.carList = [
      {
        name: "Carro 1",
        plate: "aaa-1024",
        brand: "Fiat",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, perferendis.",
        price: '15.000,00'
      }
    ]
  }


}
