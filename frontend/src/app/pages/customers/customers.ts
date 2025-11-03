import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CustomerService } from './customer.service';
import { EMPTY } from 'rxjs';
import { CustomerFormModal } from '../../core/components/customer-form-modal/customer-form-modal';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, MatTableModule, MatInputModule, ReactiveFormsModule, CustomerFormModal],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  constructor(private getcustomer: CustomerService) {}
  private authKey: any = localStorage.getItem('authToken');
  private http = inject(HttpClient);
  searchControl = new FormControl('');
  customers = signal<any[]>([]);
  displayedColumns = ['name', 'email', 'phone', 'address', 'actions'];

  // ✅ Modal signals
  isModalOpen = signal(false);
  modalMode = signal<'add' | 'edit'>('add');
  selectedCustomer = signal<any>(null);
  originalCustomers = signal<any[]>([]);

  // ngOnInit() {
  //   this.getcustomer.getCustomer(this.authKey).subscribe({
  //     next: (data: any): void => {
  //       this.customers.set(data.customers);
  //       console.log(this.customers(), 'this is our get customer');
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //   });
  // }

  ngOnInit() {
    // Load all customers initially
    this.getcustomer.getCustomer(this.authKey).subscribe({
      next: (data: any) => {
        this.customers.set(data.customers);
        this.originalCustomers.set(data.customers); // ✅ backup original
      },

      error: (err) => console.log(err),
    });

    // ✅ Search with Debouncing
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), // wait before sending request
        distinctUntilChanged(), // avoid duplicate hits
        switchMap((search) => {
          if (!search) {
            this.customers.set(this.originalCustomers()); // ✅ Reset if empty
            return EMPTY;
          }
          return this.getcustomer.searchCustomer(search, this.authKey);
        })
      )
      .subscribe({
        next: (data: any) => {
          this.customers.set(data.customers); // update list dynamically
        },
        error: (err) => console.log(err),
      });
  }

  loadCustomers() {
    this.getcustomer.getCustomer(this.authKey).subscribe({
      next: (data: any) => this.customers.set(data.customers),
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
      this.getcustomer.addcustomer(formData, this.authKey).subscribe({
        next: (data: any): void => {
          console.log(data, 'This is our customer data');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else if (this.modalMode() === 'edit') {
      console.log('edit and update');
      const id = this.selectedCustomer()._id; // ✅ ID safe from selectedCustomer
      console.log('Updating customer with ID:', id);
      // ✏️ Call Update API here
      this.getcustomer.updatecustomer(id, formData, this.authKey).subscribe({
        next: (data: any): void => {
          console.log(data, 'This is our update customer data');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    this.isModalOpen.set(false);
  }

  onEdit(customer: any) {
    console.log('Edit customer:', customer);
    // Yaha modal ya form open hoga edit ke liye
  }
}
