import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddUserRequest, UpdateUserRequest, User } from 'src/api/models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Data } from 'src/api/models/data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  endpoint: string = environment.apiUrl + '/api/users/';

  getUsers(): Observable<Data> {
    return this.httpClient.get<Data>(this.endpoint);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.endpoint + id);
  }

  addUser(user: AddUserRequest): Observable<User> {
    return this.httpClient.post<User>(this.endpoint, user);
  }

  updateUser(id: string, user: UpdateUserRequest): Observable<void> {
    return this.httpClient.put<void>(this.endpoint + id, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.endpoint + id);
  }
}
