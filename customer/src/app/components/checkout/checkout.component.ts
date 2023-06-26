import { Router } from '@angular/router';
import { PaymentService, PaymentDto } from './../services/payment.service';
import { AuthService } from './../services/auth.service';
import { OrderDto } from 'src/app/apis/orderDto';
import { OrderService } from './../services/order.service';
import { ShareService } from './../services/share.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ItemInCart } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  selectedMethod!: Method;
  orderDto!: OrderDto;
  formGroup!: FormGroup;
  methods!: Method[];
  itemsInCart!: ItemInCart[];
  totalPrice = 0;
  showDialogPayment = false;
  constructor(
    private shareService: ShareService,
    private AuthService: AuthService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private Router:Router
  ) {}
  ngOnInit() {
    this.methods = [
      { name: 'COD', code: 'COD' },
      { name: 'PayPal', code: 'PAYPAL' },
    ];
    this.formGroup = new FormGroup({
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      paymentMethod: new FormControl<Method>(this.methods[0]),
    });
    this.itemsInCart = this.shareService.items;
    if (this.itemsInCart !== undefined) {
      for (const iterator of this.itemsInCart) {
        this.totalPrice += iterator.price! * iterator.quantity!;
      }
    }
  }
  onOrder() {
    let address = this.formGroup.get('address')?.value;
    let phone = this.formGroup.get('phone')?.value;
    let paymentMethod = this.formGroup.get('paymentMethod')?.value.code;
    let Order: OrderDto = {
      customerId: this.AuthService.userId,
      paymentMethod: paymentMethod,
      address: address,
      phone: phone,
    };
    this.orderService.createOrder(Order).subscribe((data: any) => {
      if (paymentMethod === 'PAYPAL') {
        const paymentDto: PaymentDto = {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.totalPrice.toString(),
              },
            },
          ],
        };
        this.paymentService
          .createPayment(data, paymentDto)
          .subscribe((data: any) => {
            for (const link of data.links) {
              if (link.rel == 'approve') {
                window.open(link.href,'_self');
              }
            }
          });
      } else {
        this.Router.navigate(['cart/checkout/payment/success'])
      }
    });
  }
}
interface Method {
  name: string;
  code: string;
}
