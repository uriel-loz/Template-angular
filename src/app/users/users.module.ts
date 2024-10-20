import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { TableComponent } from './components/table/table.component';
import {CardModule} from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { CreateComponent } from './components/create/create.component';
import { ExportComponent } from './components/export/export.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { FormCreateComponent } from './components/form-create/form-create.component';
import {InputTextModule} from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    FloatLabelModule,
    ReactiveFormsModule
  ],
  declarations: [
    UsersComponent,
    TableComponent,
    CreateComponent,
    FormCreateComponent,
    ExportComponent,
    RefreshComponent
  ]
})
export class UsersModule { }
