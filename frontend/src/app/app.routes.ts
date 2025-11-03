import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';
import { Layout } from './core/layout/layout';
import { Customers } from './pages/customers/customers';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // Default route
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'customers', component: Customers },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then((m) => m.Products),
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/orders/orders').then((m) => m.Orders),
      },
      {
        path: 'reports',
        loadComponent: () => import('./pages/reports/reports').then((m) => m.Reports),
      },
      {
        path: 'staff',
        loadComponent: () => import('./pages/managestaff/managestaff').then((m) => m.Managestaff),
      },
    ],
  },
  // { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }, // Unknown routes
];
