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
  selector: 'app-customer-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form-modal.html',
  styleUrl: './customer-form-modal.css',
})
export class CustomerFormModal implements  OnChanges {
  @Input() isEdit = false;
  @Input() visible: boolean = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() customerData: any = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  customerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log('this is our customer data..', this.customerData);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // ✅ Initialize form
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      address: ['', [Validators.required]],
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
