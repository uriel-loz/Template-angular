import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent {
  private usersService = inject(UsersService);

  refresh() : void {
    this.usersService.refreshTable();
  }
}
