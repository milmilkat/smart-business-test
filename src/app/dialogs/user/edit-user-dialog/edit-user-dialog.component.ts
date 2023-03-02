import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/api/models/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.email.setValue(data.email);
    this.firstName.setValue(data.firstName);
    this.lastName.setValue(data.lastName);
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) return 'You must enter a value';

    if (control.hasError('minlength'))
      return 'You must enter at least two characters';

    if (control === this.email && control.hasError('email'))
      return 'Not a valid email';

    return '';
  }

  onCancel() {
    this.dialogRef.close();
  }

  onUpdate() {
    this.dialogRef.close(<EditUserDialogResult>{
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
    });
  }
}

export interface EditUserDialogResult {
  firstName: string;
  lastName: string;
  email: string;
}
