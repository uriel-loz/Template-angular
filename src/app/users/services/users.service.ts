import { Injectable } from '@angular/core';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private tableReference!: Table;
  private showModalSubject = new BehaviorSubject<boolean>(false);
  public showModal$ = this.showModalSubject.asObservable();

  setTable(table: Table){  
    this.tableReference = table;
  }

  getTable(): Table | null {
    return this.tableReference || null;
  }

  setModal(showModal: boolean): void {    
    this.showModalSubject.next(showModal);
  }

}
