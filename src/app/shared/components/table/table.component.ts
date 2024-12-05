import { AfterViewInit, Component, inject, Input, ViewChild, OnInit } from '@angular/core';
import { ColumnDefinition, Filter, Pagination } from '../../interfaces/shared.interface';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { SharedService } from '../../services/shared.service';
import { FilterMetadata } from 'primeng/api';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit, AfterViewInit {
  private sharedService = inject(SharedService);
  public rows: number = 10;
  public first: number = 0;
  public last: number = 0;
  public totalRecords: number = 0;
  public sortField: string = 'id';
  public sortOrder: number = -1;
  public loading: boolean = false;
  public page: number = 1;
  public size: number = 10;
  public data: T[] = [];
  @Input() fetchData!: (sortField: string, sortOrder: number, page: number, size: number, filters: Filter) => Observable<Pagination<T>>;
  @Input() columns: ColumnDefinition[] = [];
  @ViewChild('dataTable') table!: Table;

  getFilterParams(filters: FilterMetadata | FilterMetadata[] | undefined) {
    let filterParams: Filter = {};

    if (Array.isArray(filters)) {
      filters.forEach((filter, index) => {
        console.log(index);
        console.log(filter);
      });
    } else if (filters) {
      for (const filter in filters) {
        const value = filters[filter as keyof FilterMetadata].value;

        if (value) 
          filterParams[filter] = value;
      }
    }

    return filterParams;
  }

  loadRegisters(event: TableLazyLoadEvent): void {
    this.sortField = typeof event.sortField === 'string' ? event.sortField : this.sortField;
    this.sortOrder = event.sortOrder || this.sortOrder;
    this.page = Math.floor((event.first ?? 0) / (event.rows ?? 10)) + 1;
    this.size = event.rows ?? 10;
    const filters: Filter = this.getFilterParams(event.filters);


    this.fetchData(this.sortField, this.sortOrder, this.page, this.size, filters)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: Pagination<T>) => {
        this.data = response.data;
        this.first = response.from;
        this.last = response.to;
        this.totalRecords = response.total;
      });
  }

  refresh(): void {
    this.loading = true;
    this.table.reset();
  }

  ngOnInit(): void {
    this.loading = true;
  }

  ngAfterViewInit(): void {
    this.sharedService.setTable(this.table);
  }
}
