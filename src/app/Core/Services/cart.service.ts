import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient)
  cartNumber:WritableSignal<number> = signal(0)

  /**
   *
   */
  constructor() {
    effect(()=>{
      localStorage.setItem("UserCart",this.cartNumber().toString())
    })    
  }
  addProducToCart(idProduct: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": idProduct
      }
    );
  }
  getLoggedUserCart():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }
  DeletCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }
  UpdateCartProductQuantity(id: string ,newCount:number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      { "count": newCount });
  }
  ClearCartItem(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
