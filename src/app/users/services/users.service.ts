import { Injectable } from '@angular/core';
import { Table } from 'primeng/table';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private tableReference!: Table;

  setTable(table: Table){  
    this.tableReference = table;
  }

  getTable(): Table | null {
    return this.tableReference || null;
  }
}
