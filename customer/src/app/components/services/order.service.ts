import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDto } from 'src/app/apis/orderDto';
import { API } from 'src/environments/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order:OrderDto){
    return this.http.post(`${API.BASE_URL}/api/v1/orders`,order,{responseType:'text'});
  }
}
