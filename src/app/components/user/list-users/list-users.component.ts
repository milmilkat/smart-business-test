import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from 'src/api/models/data';
import { UpdateUserRequest, User } from 'src/api/models/user';
import { UserService } from 'src/api/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import {
  EditUserDialogComponent,
  EditUserDialogResult,
} from 'src/app/dialogs/user/edit-user-dialog/edit-user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'created'];
  clickedRows = new Set<User>();
  dataSource = new MatTableDataSource<User>();
  loading = true;

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data: Data) => {
        this.users = data.members;
        this.dataSource.data = data.members;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) =>
        this.snackBarService.openError(err.error),
    });
  }

  onRowClick(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      height: '400px',
      width: '600px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result: EditUserDialogResult) => {
      if (result) {
        this.userService
          .updateUser(user.userId, <UpdateUserRequest>{
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
          })
          .subscribe({
            next: () => this.updateUsers(user, result),
            error: (err: HttpErrorResponse) =>
              this.snackBarService.openError(err.error),
          });
      }
    });
  }

  updateUsers(before: User, after: UpdateUserRequest) {
    this.users = this.users.filter((u) => u.userId !== before.userId);
    this.users.push(<User>{
      userId: before.userId,
      created: before.created,
      firstName: after.firstName,
      lastName: after.lastName,
      email: after.email,
    });
    this.dataSource.data = this.users;
    this.snackBarService.openSuccess(`User with email "${before.email}" updated`);
  }
}
