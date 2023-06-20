import { AuthService } from './../../services/auth.service';
import { ItemDTO } from './../../../apis/item';
import { CartService } from './../../services/cart.service';
import { Book } from 'src/app/apis/book';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BookService],
})
export class BooksComponent implements OnInit {
  userId!:string;
  constructor(private bookService: BookService
    ,private cartService:CartService
    ,private authService:AuthService
    ,private router: Router) {}
  books: Book[] = [];
  book: Book = {};
  responsiveOptions:any[] = [
    {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
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
    if(this.authService.isLoggedIn){
      let item: ItemDTO = {
        bookId:bookId,
        customerId:this.authService.userId,
        quantity:quantity
      };
      this.cartService.addToCart(item).subscribe(()=>{
        console.log("Add to cart ok");
      })
    }
    else{
      this.authService.loggin();
    }

  }
  goToDetail(book:Book){
    this.router.navigate(['',book.slug,book.id])
  }
}
