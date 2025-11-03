import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form-modal.html',
  styleUrl: './product-form-modal.css',
})
export class ProductFormModal implements OnChanges {
  @Input() isEdit = false;
  @Input() visible: boolean = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() customerData: any = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  customerForm!: FormGroup;
  categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'grocery', label: 'Grocery' },
    { value: 'home-appliances', label: 'Home Appliances' },
    { value: 'books', label: 'Books' },
  ];

  constructor(private fb: FormBuilder) {
    console.log('this is our customer data..', this.customerData);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // ✅ Initialize form
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });

    // ✅ If edit mode, populate form
    if (changes['customerData'] && this.customerData) {
      this.customerForm.patchValue(this.customerData);
    }
  }
  close() {
    this.closeModal.emit();
  }
  onSubmit() {
    if (this.customerForm.valid) {
      this.submitForm.emit(this.customerForm.value);
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
