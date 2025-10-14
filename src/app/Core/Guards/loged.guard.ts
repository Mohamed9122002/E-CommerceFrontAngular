import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
    const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
  if(localStorage.getItem("UserToken") !== null){
        _router.navigate(["/home"]);
    return false;
  }
  }
  return true;
};
