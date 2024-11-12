import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'shared-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  private sharedService = inject(SharedService);

  export(): void {
    const table = this.sharedService.getTable();

    if (table) 
      table.exportCSV();
  }
}
