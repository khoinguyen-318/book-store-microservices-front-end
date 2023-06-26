import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path:'',component:CheckoutComponent},
  { path:':id',component:CheckoutComponent},
  { path:'payment/:orderId/:state',component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
