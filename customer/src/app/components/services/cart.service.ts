import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/app/apis/book';
import { ItemDTO } from 'src/app/apis/item';
import { API } from 'src/environments/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addToCart(item:ItemDTO){
    return this.http.post(`${API.BASE_URL}/api/v1/cart`,item);
  }
  getAllItemsInCart(id:string){
    console.log(id);
    return this.http.get(`${API.BASE_URL}/api/v1/cart/${id}`)
  }
}
