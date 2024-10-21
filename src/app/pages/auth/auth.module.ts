import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { RestetPasswordDialogComponent } from './login-page/dialogs/restet-password-dialog/restet-password-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    LoginPageComponent,
    RestetPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    DialogModule,

    ButtonModule,
    FloatLabelModule,
    InputTextModule,

  ]
})
export class AuthModule { }
