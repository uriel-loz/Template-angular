import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  private usersService = inject(UsersService);

  public openModal(): void {
    this.usersService.setModal(true);
  }
}
