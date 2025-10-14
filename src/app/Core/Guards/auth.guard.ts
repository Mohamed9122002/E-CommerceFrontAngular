import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
  const platformId = inject(PLATFORM_ID);
if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem("UserToken");

    if (!token) {
      _router.navigate(['/login']);
      return false;
    }
  }
    return true;
};
