import { Injectable } from "@angular/core";
import { ItemInCart } from "../cart/cart.component";

@Injectable({
  providedIn: 'root'
})
export class ShareService{
  public items!:ItemInCart[];
}
