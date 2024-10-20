import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'users-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit{
  private userService = inject(UsersService);
  private formBuilder = inject(FormBuilder)
  public showModal: boolean = false;
  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    console.log(this.form.value);
    
  }

  ngOnInit(): void {
    this.userService.showModal$
      .subscribe((showModal: boolean) => this.showModal = showModal);
  }

}
