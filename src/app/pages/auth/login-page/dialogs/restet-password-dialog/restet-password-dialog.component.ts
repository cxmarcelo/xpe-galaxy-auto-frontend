import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-restet-password-dialog',
  templateUrl: './restet-password-dialog.component.html',
  styleUrl: './restet-password-dialog.component.scss'
})
export class RestetPasswordDialogComponent implements OnInit {

  @Input() dialogOpened: boolean = false;
  @Output() dialogOpenedChange = new EventEmitter<boolean>();

  @Input() session: string = "";

  @Output() saveEvent = new EventEmitter<String>();

  username: string = "";
  newPassword: string = "";
  confirmNewPassword: string = "";

  constructor(
    private authService: AuthService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  public changePassword() {
    console.log("Tentei checar");

    if (!this.isValidCredentials()) {
      return;
    }

    this.authService.respondToNewPassword(this.session, this.username, this.newPassword).subscribe({
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

  private isValidCredentials(): boolean {
    if (this.newPassword != this.confirmNewPassword) {
      return false;
    }

    return true;
  }

  public close() {
    this.dialogOpened = false;
  }

  public onHide() {
    this.dialogOpened = false;
    this.dialogOpenedChange.emit(this.dialogOpened);
  }

}
