import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Filter, Pagination, User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8000/api/users';
  private http = inject(HttpClient);

  getUsers(sortField: string | string [], sortOrder: number, page: number, size: number, filters: Filter): Observable<Pagination> {
    const params = new HttpParams()
      .set('sort_field', Array.isArray(sortField) ? sortField.join(',') : sortField)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', sortOrder.toString())
      .set('filters', JSON.stringify(filters));

    return this.http.get<Pagination>(this.baseUrl, {params});
  }

  storeUser(user: User): Observable<boolean> {
    return this.http.post<User>(this.baseUrl, user)
      .pipe(map(() => true))
      .pipe(catchError(error  => of(false)))
  }
}
