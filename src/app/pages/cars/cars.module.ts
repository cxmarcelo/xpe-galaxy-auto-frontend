import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { SearchCarsPageComponent } from './search-cars-page/search-cars-page.component';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    SearchCarsPageComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,

    ButtonModule,
    CarouselModule,
    
  ]
})
export class CarsModule { }
