import { AuthService } from './../services/auth.service';
import { CategoryService } from './../services/category.service';
import { BookService } from './../services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Book } from 'src/app/apis/book';
import { ItemDTO } from 'src/app/apis/item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit{
  slug:string = '';
  bookId:string = '';
  quantity : number = 1;
  items: MenuItem[] = [];
  home!: MenuItem;
  book!:Book;
  category:string='';
  constructor(private route: ActivatedRoute,
    private cartService:CartService,
    private categoryService:CategoryService,
    private authService:AuthService,
    private bookService:BookService) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id')!;
      this.getDetailBook(this.bookId);
    });
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [{label:'Category'}]
  }
  getDetailBook(bookId:string){
    this.bookService.getDetailBook(bookId).subscribe((data)=>{
      this.book = data;
      console.log(this.book);
      this.categoryService.getCategoryById(data.categoryId).subscribe((res)=>{
        this.category = res.name;
        this.items = [{label:res.name,routerLink:'/category/'+res.slug+'/'+res.id}]
      })
    })
  }
  addToCart(bookId:string,quantity:number){
    let item: ItemDTO = {
      bookId:bookId,
      customerId:this.authService.userId,
      quantity:quantity
    };
    console.log(item);
    this.cartService.addToCart(item).subscribe(()=>{
      console.log("Add to cart ok");
    })
  }
}
