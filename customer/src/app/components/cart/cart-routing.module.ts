import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'checkout',loadChildren:() => import('../checkout/checkout.module').then((m) => m.CheckoutModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
