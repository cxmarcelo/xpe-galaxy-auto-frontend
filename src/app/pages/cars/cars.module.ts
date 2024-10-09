import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { SearchCarsPageComponent } from './search-cars-page/search-cars-page.component';


import { CarEditDialogComponent } from './search-cars-page/dialogs/car-edit-dialog/car-edit-dialog.component';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown';;
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { CreateSaleDialogComponent } from './search-cars-page/dialogs/create-sale-dialog/create-sale-dialog.component';

@NgModule({
  declarations: [
    SearchCarsPageComponent,
    CarEditDialogComponent,
    CreateSaleDialogComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,

    ButtonModule,
    CarouselModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    FloatLabelModule,
    InputTextModule,
    PaginatorModule,
    TagModule

  ]
})
export class CarsModule { }
