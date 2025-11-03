import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { CdkListbox } from '@angular/cdk/listbox';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormModal } from '../../core/components/product-form-modal/product-form-modal';
@Component({
  selector: 'app-products',
  imports: [CommonModule, MatTableModule, MatInputModule, ReactiveFormsModule, ProductFormModal],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  constructor(private getProduct: ProductService) {}
  private authKey: any = localStorage.getItem('authToken');
  private http = inject(HttpClient);
  products = signal<any[]>([]);
  displayedColumns = ['name', 'email', 'phone', 'address', 'actions'];
  isModalOpen = signal(false);
  modalMode = signal<'add' | 'edit'>('add');
  selectedCustomer = signal<any>(null);
  originalCustomers = signal<any[]>([]);

  ngOnInit(): void {
    this.getProduct.getProducts(this.authKey).subscribe({
      next: (data: any) => {
        this.products.set(data.products);
        console.log('This is our Products', this.products());
      },

      error: (err) => console.log(err),
    });
  }
  openAddModal() {
    this.modalMode.set('add');
    this.selectedCustomer.set(null); // Reset previous data
    this.isModalOpen.set(true);
  }

  openEditModal(customer: any) {
    this.modalMode.set('edit');
    this.selectedCustomer.set(customer); // Prefill data
    this.isModalOpen.set(true);
    console.log('Edit customer:', customer);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
  handleModalSubmit(formData: any) {
    if (this.modalMode() === 'add') {
      // 🚀 Call Create API here
      console.log(formData, ' this is our new data');
      this.getProduct.addProducts(formData, this.authKey).subscribe({
        next: (data: any): void => {
          console.log(data, 'This is our product data');
          this.products.update((prev) => [...prev, data.newProduct]); // <- push new product
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else if (this.modalMode() === 'edit') {
      console.log('edit and update');
      const id = this.selectedCustomer()._id; // ✅ ID safe from selectedCustomer
      console.log('Updating Product with ID:', id);
      // ✏️ Call Update API here
      this.getProduct.updateProduct(id, formData, this.authKey).subscribe({
        next: (data: any): void => {
          console.log(data, 'This is our update customer data');
          this.products.update((prev) =>
            prev.map((p) => (p._id === id ? { ...p, ...formData } : p))
          );
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    this.isModalOpen.set(false);
  }
}
