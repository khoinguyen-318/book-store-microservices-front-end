import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/apis/book';
import { ItemDTO } from 'src/app/apis/item';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-relate',
  templateUrl: './relate.component.html',
  styleUrls: ['./relate.component.scss']
})
export class RelateComponent {
  constructor(private bookService: BookService
    ,private cartService:CartService
    ,private router: Router) {}
  books: Book[] = [];
  book: Book = {};
  responsiveOptions:any[] = [
    {
        breakpoint: '1400px',
        numVisible: 5,
        numScroll: 5
    },
    {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
    }
];
  ngOnInit(): void {
    this.refreshData();
  }
  refreshData() {
    this.bookService.getAllBook(0, 20).subscribe((data) => {
      this.books = data;
    });
  }
  addToCart(bookId:string,quantity:number){
    let item: ItemDTO = {
      bookId:bookId,
      customerId:"csutomer_fake_0001",
      quantity:quantity
    };
    this.cartService.addToCart(item).subscribe(()=>{
      console.log("Add to cart ok");
    })
  }
  goToDetail(book:Book){
    this.router.navigate(['',book.slug,book.id])
  }
}
