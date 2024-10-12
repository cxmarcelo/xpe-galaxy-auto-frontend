import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    UploadDialogComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    FileUploadModule,
    TableModule,
  ],
  exports: [
    UploadDialogComponent
  ]
})
export class DialogsModule { }
