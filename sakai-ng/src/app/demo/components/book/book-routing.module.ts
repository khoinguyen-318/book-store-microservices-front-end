import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookComponent } from './book.component';
import { SavebookComponent } from './savebook/savebook.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'add', component: SavebookComponent },
        { path: '', component: BookComponent },
    ])],
    exports: [RouterModule]
})
export class BookRoutingModule { }
