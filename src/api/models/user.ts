export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  created: Date;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AddUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}
