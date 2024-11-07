import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Filter, User } from '../../interfaces/users.interface';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { UsersService } from '../../services/users.service';
import { FilterMetadata } from 'primeng/api';
import { finalize } from 'rxjs';

type ColumnDefinition = {
  field: string;
  header: string;
};

@Component({
  selector: 'users-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  private apiService = inject(ApiService);
  private usersService = inject(UsersService);
  public users: User[] = [];
  public rows: number = 10;
  public first: number = 0;
  public last: number = 0;
  public totalRecords: number = 0;
  public sortField: string = 'id';
  public sortOrder: number = -1;
  public loading: boolean = false;
  public page: number = 1;
  public size: number = 10;
  @ViewChild('dataTable') table!: Table;
  public columns: ColumnDefinition[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'last_name', header: 'Last name' },
    { field: 'email', header: 'Email' },
  ];

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

  loadUsers(event: TableLazyLoadEvent) {
    this.sortField = typeof event.sortField === 'string' ? event.sortField : this.sortField;
    this.sortOrder = event.sortOrder || this.sortOrder;
    this.page = Math.floor((event.first ?? 0) / (event.rows ?? 10)) + 1;
    this.size = event.rows ?? 10;
    const filters: Filter = this.getFilterParams(event.filters);
    
    this.apiService.getUsers(this.sortField, this.sortOrder, this.page, this.size, filters)
      .pipe(finalize(() => this.loading = false))
      .subscribe(({data, from, to, total}) => {
        this.users = data;
        this.first = from;
        this.last = to;
        this.totalRecords = total;
      })
  }

  refreshTable() {
    if (!this.table) return;

    this.loading = true;

    // Reiniciar la paginación
    this.first = 0;  // Este es el valor que controla la paginación
    this.table.first = 0;  // Esto actualiza la UI de la tabla

    this.loadUsers({
      first: 0,  // Importante: aquí también debe ser 0 para la primera página
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      filters: this.table.filters,
    });
  }


  ngOnInit() {
    this.loading = true;
    this.usersService.refresh$.subscribe(()  => {
      this.refreshTable();
    });
  }

  ngAfterViewInit() {
    this.usersService.setTable(this.table);
  }
}
