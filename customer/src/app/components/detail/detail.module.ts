import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { RelateComponent } from './relate/relate.component';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
@NgModule({
  declarations: [
    DetailComponent,
    RelateComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    DividerModule,
    BreadcrumbModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    CarouselModule
  ]
})
export class DetailModule { }
