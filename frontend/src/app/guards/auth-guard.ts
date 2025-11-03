// // auth.guard.ts
// import { Inject, Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   // router = Inject(Router);
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       return true; // route accessible
//     } else {
//       this.router.navigate(['/login']); // redirect to login
//       return false;
//     }
//   }
// }

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ This runs only in browser
      const token = localStorage.getItem('authToken');
      if (token) {
        return true;
      }
    }

    //  No token or running on server -> redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
