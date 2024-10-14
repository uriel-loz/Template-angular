import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Pagination, User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8000/api/users';
  private http = inject(HttpClient);

  getUsers(): Observable<Pagination> {
    return this.http.get<Pagination>(this.baseUrl);
  }

  storeUser(user: User): Observable<boolean> {
    return this.http.post<User>(this.baseUrl, user)
      .pipe(map(() => true))
      .pipe(catchError(error  => of(false)))
  }
}
