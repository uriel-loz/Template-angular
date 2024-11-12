import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableComponent } from './components/table/table.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { ExportComponent } from './components/export/export.component';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        ToolbarModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        RippleModule,
        FloatLabelModule,
    ],
    declarations: [
        TableComponent,
        RefreshComponent,
        ExportComponent,
    ],
    exports: [
        TableComponent,
        RefreshComponent,
        ExportComponent,
        CardModule,
        ToolbarModule,
    ]
})
export class SharedModule { }
