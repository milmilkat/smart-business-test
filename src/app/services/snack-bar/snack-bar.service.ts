import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSuccess(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['successSnackBar'],
    });
  }

  openError(errorMessage: string) {
    this.snackBar.open(errorMessage, 'X', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['errorSnackBar'],
    });
  }
}
