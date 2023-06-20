import { ShareService } from './../services/share.service';
import { AuthService } from './../services/auth.service';
import { BookService } from './../services/book.service';
import { CartService } from './../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

export interface ItemInCart{
  id?:string;
  title?: string;
  price?: number;
  imagesUrl?: string;
  quantity?:number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy{
  itemsCart:ItemInCart[] = [];
  totalPrice:number = 0;
  constructor(
    private authService:AuthService,
    private cartService:CartService,
    private shareService:ShareService,
    private bookService:BookService){}
  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      this.getAllItemInCart(this.authService.userId);
    }
  }
  getAllItemInCart(id:string){
    this.cartService.getAllItemsInCart(id).subscribe((data:any)=>{
      this.totalPrice = data.totalPrice;
      for(let item of data.items) {
          this.bookService.getDetailBook(item.bookId).subscribe((res :any)=>{
            let e:ItemInCart = {
              id:item.bookId,
              price: item.price,
              quantity:item.quantity,
              title: res.title,
              imagesUrl: res.imagesUrl[0]
            }
            this.itemsCart.push(e);
          },(err)=>console.log(err))
        }
    })
  }
  ngOnDestroy(): void {
    this.shareService.items = this.itemsCart;
  }
}
