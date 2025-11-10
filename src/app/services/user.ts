import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  lastname: string;
  firstname: string;
  country: string;
  role: 'USER' | 'ADMIN';
  enabled: boolean;
  authorities?: { authority: string }[];
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  accountNonExpired?: boolean;
}

export interface UpdateUserRequest {
  username?: string;
  role?: 'USER' | 'ADMIN';
  enabled?: boolean;
  password?: string;
  firstname?: string;
  lastname?: string;
  country?: string;
}

export interface UpdateUserResponse {
  firstname: string;
  lastname: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  async getMe(): Promise<Observable<User>> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  updateUser(id: number, data: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.put<UpdateUserResponse>(`${this.apiUrl}/update/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      responseType: 'text'
    });
  }
}
