import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient: HttpClient) { }
  addProductToWishlist(productId: string,): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": productId
      }
    );
  }
   getWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }

  removeProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`);
  }
}

