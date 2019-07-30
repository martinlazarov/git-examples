import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmationMessageComponent } from '../components/confirmation-message/confirmation-message.component';
import { ErrorMeassageComponent } from '../components/error-meassage/error-meassage.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    openConfirmationMessage(payload: any) {
        this.snackBar.openFromComponent(ConfirmationMessageComponent, {
              data: payload,
              duration: 2000,
              panelClass: ['snackbar'], // not correct should be css class or ...
              horizontalPosition: 'right',
              verticalPosition: 'top'
        })
    }

    openErrorMessage(payload: any) {
        this.snackBar.openFromComponent(ErrorMeassageComponent, {
              data: payload,
              duration: 2000,
              panelClass: ['snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
        })
    }
}


