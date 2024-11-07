import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'users-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit{
  private userService = inject(UsersService);
  private formBuilder = inject(FormBuilder);
  private apiService = inject(ApiService);
  public showModal: boolean = false;
  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onClose(): void {
    this.form.reset();
    this.userService.setModal(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    Swal.fire({
      title: 'Creating user',
      text: 'Please wait...',
      willOpen: () => {
        Swal.showLoading();
      },
    });

    this.apiService.storeUser(this.form.value)
      .subscribe({
        next: (response: boolean) => {
          if (response) {
            Swal.fire({
              icon: "success",
              title: "Operation success",
              text: "User created successfully",
            });

            this.userService.refreshTable();
            this.onClose();
          }
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong! Please try again later.",
          });
        }
      });
    
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
