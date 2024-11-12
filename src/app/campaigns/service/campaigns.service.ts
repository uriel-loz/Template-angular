import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaigns } from '../interfaces/campaigns';
import { Filter } from '../../users/interfaces/users.interface';
import { Pagination } from '../../shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8000/api/campaigns';

  getCampaigns(sortField: string , sortOrder: number, page: number, size: number, filters: Filter): Observable<Pagination<Campaigns>> {
    const params = new HttpParams()
      .set('sort_field', sortField)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', sortOrder.toString())
      .set('filters', JSON.stringify(filters));

    return this.http.get<Pagination<Campaigns>>(this.baseUrl, {params});
  }
}
