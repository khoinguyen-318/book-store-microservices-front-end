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
  constructor(
    private shareService: ShareService,
    private AuthService: AuthService,
    private paymentService: PaymentService,
    private orderService: OrderService
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
      console.log(data);
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
                const windowName: string = 'Payment Window';
                const width: number = 500;
                const height: number = 600;
                const left: number = window.innerWidth / 2 - width / 2;
                const top: number = window.innerHeight / 2 - height / 2;
                const features: string = `width=${width},height=${height},left=${left},top=${top}`;
                window.open(link.href, windowName, features);
              }
            }
          });
      }
    });
  }
}
interface Method {
  name: string;
  code: string;
}
