import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { CdkListbox } from '@angular/cdk/listbox';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  imports: [CommonModule, MatTableModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  constructor(private getProduct: ProductService) {}
  private authKey: any = localStorage.getItem('authToken');
  private http = inject(HttpClient);
  products = signal<any[]>([]);
  displayedColumns = ['name', 'email', 'phone', 'address', 'actions'];

  ngOnInit(): void {
    this.getProduct.getProducts(this.authKey).subscribe({
      next: (data: any) => {
        this.products.set(data.products);
        console.log('This is our Products', this.products());
      },

      error: (err) => console.log(err),
    });
  }
}
