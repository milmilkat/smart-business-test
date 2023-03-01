import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from 'src/api/models/data';
import { User } from 'src/api/models/user';
import { UserService } from 'src/api/services/user/user.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditUserDialogComponent } from 'src/app/dialogs/user/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'created'];
  clickedRows = new Set<User>();

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data: Data) => (this.users = data.members),
      error: (err: HttpErrorResponse) => console.log(err.error),
    });
  }

  onRowClick(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // success or failure
    });
  }
}
