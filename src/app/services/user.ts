import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUserRequest, UpdateUserResponse, User } from '@/app/types/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/all`);
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/me`);
  }

  registerNewUser(data: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.post<UpdateUserResponse>(`${this.apiUrl}/admin/register`, data);
  }

  updateUser(id: number, data: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.put<UpdateUserResponse>(`${this.apiUrl}/admin/update/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/delete/${id}`, {
      responseType: 'text'
    });
  }
}
