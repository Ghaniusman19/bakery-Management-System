import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Observable, map } from 'rxjs';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isHandset$: Observable<boolean>;
  menu = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Customers', icon: 'people', route: '/customers' },
    { label: 'Products', icon: 'inventory_2', route: '/products' },
    { label: 'Orders', icon: 'receipt_long', route: '/orders' },
    { label: 'Reports', icon: 'bar_chart', route: '/reports' },
    { label: 'Manage Staff', icon: 'group', route: '/staff' },
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: Auth
  ) {
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map((result) => result.matches));
  }
  closeOnMobile(drawer: any) {
    this.isHandset$.subscribe((isMobile) => {
      if (isMobile) {
        drawer.toggle();
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
