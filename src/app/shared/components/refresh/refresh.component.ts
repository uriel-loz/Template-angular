import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'shared-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent {
  private sharedService = inject(SharedService);

  refresh() {
    const table = this.sharedService.getTable();
    table.sortField = 'id';
    table.sortOrder = -1; // -1 para orden descendente, 1 para ascendente
    table.reset();
  }
}
