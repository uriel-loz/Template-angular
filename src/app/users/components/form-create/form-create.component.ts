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

  onClose(): void {
    this.form.reset();
    this.showModal = false;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }
  }

  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null; 

    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      if (key === 'required') {
        return 'This field is required';
      }

      if (key === 'email') {
        return 'This field must be a valid email';
      }
    }

    return '';
  }

  ngOnInit(): void {
    this.userService.showModal$
      .subscribe((showModal: boolean) => this.showModal = showModal);
  }

}
