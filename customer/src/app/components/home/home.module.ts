import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { BooksComponent } from './books/books.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    ButtonModule,
    ToastModule
  ]
})
export class HomeModule { }
