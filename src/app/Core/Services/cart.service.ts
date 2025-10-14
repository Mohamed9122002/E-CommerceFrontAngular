import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient)
  MyHeaders: any = { token: localStorage.getItem("UserToken") }

  addProducToCart(idProduct: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": idProduct
      },
      {
        headers: this.MyHeaders
      }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.MyHeaders
    });
  }
  DeletCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: this.MyHeaders
    });
  }
  UpdateCartProductQuantity(id: string ,newCount:number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      { "count": newCount },
      {
        headers: this.MyHeaders
      });
  }
  ClearCartItem(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.MyHeaders
    });
  }
}
