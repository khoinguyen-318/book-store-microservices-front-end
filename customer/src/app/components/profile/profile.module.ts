import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ToastModule } from 'primeng/toast';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MyorderComponent } from './myorder/myorder.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
@NgModule({
  declarations: [
    ProfileComponent,
    MyorderComponent,
    MyprofileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ToastModule,
    PanelMenuModule
  ]
})
export class ProfileModule { }
