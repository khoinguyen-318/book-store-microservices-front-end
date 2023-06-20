import { ScrollTopModule } from 'primeng/scrolltop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MegaMenuModule } from 'primeng/megamenu';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { MenubarModule } from 'primeng/menubar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MegaMenuModule,
    InputTextModule,
    RippleModule,
    InputSwitchModule,
    RadioButtonModule,
    BadgeModule,
    ButtonModule,
    FormsModule,
    MenubarModule,
    ScrollTopModule
  ],
  exports:[LayoutComponent],
})
export class LayoutModule {}
