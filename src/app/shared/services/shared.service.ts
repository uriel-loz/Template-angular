import { Injectable } from '@angular/core';
import { Table } from 'primeng/table';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private table!: Table;

  setTable(table: Table): void {
    this.table = table;
  }

  getTable(): Table {
    return this.table ;
  }
}
