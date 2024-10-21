import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoginError } from '../../../models/dto/errors/login-error';
import { ExceptionErrorCodeEnum } from '../../../models/enums/exception-error-code-enum';
import { LoginErrorCodeEnum } from '../../../models/enums/login-error-code-enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  username: string = '';
  password: string = '';

  resetPasswordDialogOpened: boolean = false;
  resetPasswordDialogSession: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: resp => {
        this.router.navigate(['/']);
      },
      error: httpError => {
        let loginError: LoginError = httpError.error;
        if (loginError != null && loginError?.code == ExceptionErrorCodeEnum.LOGIN_ERROR) {
          if (loginError.loginErrorCode == LoginErrorCodeEnum.NEW_PASSWORD_REQUIRED) {
            this.openResetPassword(loginError.session);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: loginError.msg });
          }
        } else {
          console.error(httpError);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: "Falha para realizar o login. Consulte um administrador." });
        }
      }
    });
  }

  private openResetPassword(session: string) {
    this.resetPasswordDialogSession = session;
    this.resetPasswordDialogOpened = true;
  }

}
