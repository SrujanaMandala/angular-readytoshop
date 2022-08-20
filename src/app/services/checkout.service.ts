import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    console.log(`Purchase Info in service`, JSON.stringify(purchase));
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
