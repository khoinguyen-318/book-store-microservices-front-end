import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/api';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPayment(orderId: string, payment: PaymentDto) {
    return this.http.post(`${API.BASE_URL}/api/v1/payment/${orderId}`, payment);
  }
}
export interface PaymentDto {
  intent: string;
  purchase_units: [
    {
      amount: {
        currency_code: string;
        value: string;
      };
    }
  ];
}
