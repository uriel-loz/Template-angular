import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  private usersService = inject(UsersService);

  export() {
    const table = this.usersService.getTable();
    
    if (table) {
      table.exportCSV();
    } else {
      console.error('Table reference is not set.');
    }
  }

  isTableReady(): boolean {
    return this.usersService.getTable() !== null;
  }
}
