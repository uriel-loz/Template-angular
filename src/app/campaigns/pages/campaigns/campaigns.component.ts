import { Component, inject, OnInit } from '@angular/core';
import { CampaignsService } from '../../service/campaigns.service';
import { Campaigns } from '../../interfaces/campaigns';
import { ColumnDefinition, Filter, Pagination } from '../../../shared/interfaces/shared.interface';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent {
  private campaignsService =  inject(CampaignsService);
  public campaigns: Campaigns[] = [];
  public columns: ColumnDefinition[] = [
    { field: 'id', header: 'ID' },
    { field: 'campaign_name', header: 'Campaign name' },
    { field: 'version', header: 'Version' },
    { field: 'temporality', header: 'Temporality' },
    { field: 'start_date', header: 'Start date' },
    { field: 'end_date', header: 'End date' },
  ];

  fetchCampaigns(sortField: string, sortOrder: number, page: number, size:number, filters: Filter): Observable<Pagination<Campaigns>> {
    return this.campaignsService.getCampaigns(sortField, sortOrder, page, size, filters);
  }

}
