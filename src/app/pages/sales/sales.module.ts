import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SearchSalesPageComponent } from './search-sales-page/search-sales-page.component';
import { EditSaleDialogComponent } from './search-sales-page/dialogs/edit-sale-dialog/edit-sale-dialog.component';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchSalesPageComponent,
    EditSaleDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SalesRoutingModule,

    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    TagModule,
    TableModule,

  ]
})
export class SalesModule { }
