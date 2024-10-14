import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/users.interface';
import { Table } from 'primeng/table';
import { UsersService } from '../../services/users.service';

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
  public rowsOptions: number[] = [5, 10, 20, 50];
  public first: number = 0;
  public last: number = 0;
  public totalRecords: number = 0;
  public sortField: string = 'id';
  public sortOrder: number = -1;
  @ViewChild('dataTable') table!: Table;
  public columns: ColumnDefinition[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'last_name', header: 'Last name' },
    { field: 'email', header: 'Email' },
  ];

  ngOnInit() {
    this.apiService.getUsers()
      .subscribe(response => {
        this.users = response.data;
      });
  }

  ngAfterViewInit() {
    this.usersService.setTable(this.table);
  }
}
