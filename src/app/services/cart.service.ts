import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem) {
    //check if we alredy have item in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      //find the item in cart based on the item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
      //check if it is found
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values 
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents ');

    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name =${tempCartItem.name}, quantity=${tempCartItem.quantity}, unit_price=${tempCartItem.unitPrice}, sub_total_price=${subTotalPrice}`);

    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----------------');
  }

  removeFromCart(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    //get index of item
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

}
