import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaymentComponent } from './payment/payment.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    CheckoutComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    InputTextModule,
    DividerModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    DynamicDialogModule,
    MessagesModule,
    ToastModule
  ]
})
export class CheckoutModule { }
