import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { API } from 'src/environments/api';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  state!: string;
  orderId!: string;
  token!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Http: HttpClient
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.state = params['state'];
      this.orderId = params['orderId'];
    });
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    if(this.state==='success'){
      this.Http.get(`${API.BASE_URL}/api/v1/payment/${this.orderId}/success?token=${this.token}`).subscribe();
    }
    else{
      this.Http.get(`${API.BASE_URL}/api/v1/payment/${this.orderId}/error`).subscribe();
    }
  }
}
