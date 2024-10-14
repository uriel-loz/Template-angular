import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit{
  private userService = inject(UsersService);
  public showModal: boolean = false;

  ngOnInit(): void {
    this.userService.showModal$
      .subscribe((showModal: boolean) => this.showModal = showModal);
  }

}
