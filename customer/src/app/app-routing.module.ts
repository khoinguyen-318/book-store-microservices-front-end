import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './components/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '',
        loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule),
      },
      { path: 'category',
        loadChildren: () => import('./components/categories/categories.module').then((m) => m.CategoriesModule),
      },
      { path: 'cart',
        canActivate: [AuthGuard],
        loadChildren: () => import('./components/cart/cart.module').then((m) => m.CartModule),
      },
      { path: 'about',
        loadChildren: () => import('./components/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: ':slug/:id',
        loadChildren: () => import('./components/detail/detail.module').then((m) => m.DetailModule),
      },
      // {
      //   path: 'checkout',
      //   loadChildren: () => import('./components/checkout/checkout.module').then((m) => m.CheckoutModule),
      // },
    ],
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
