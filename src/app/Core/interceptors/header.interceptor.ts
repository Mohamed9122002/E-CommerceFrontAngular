import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  if(isPlatformBrowser(_PLATFORM_ID)){
  if (localStorage.getItem("UserToken") !== null) {
    if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')) {
      req = req.clone({
        setHeaders: { token: localStorage.getItem("UserToken") || "" }
      })
    }
  }
  }

  return next(req);
};
