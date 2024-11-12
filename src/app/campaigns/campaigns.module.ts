import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';

@NgModule({
    imports: [
        CommonModule,
        CampaignsRoutingModule,
        SharedModule,
    ],
    declarations: [
        CampaignsComponent
    ]
})
export class CampaignsModule { }
