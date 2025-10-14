import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  userData: any = null
  private readonly _httpClient = inject(HttpClient)
  private readonly _router = inject(Router)
  setRegisterForm(data: object): Observable<any> {
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
  }
  setLgoinForm(data: object): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data)
  }
  saveUserData(): void {
    if (localStorage.getItem("UserToken") !== null) {
      this, this.userData = jwtDecode(localStorage.getItem("UserToken")!)
    }
  }
  logOut():void{
    localStorage.removeItem("UserToken")
    this.userData =  null 
    this._router.navigate(['/login'])

  }
}
